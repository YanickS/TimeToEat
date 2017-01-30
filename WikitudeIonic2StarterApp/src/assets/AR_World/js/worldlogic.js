// AR World
var World = {
	
	userLocation: null,
	isRequestingData: false,
	initiallyLoadedData: false,
	markerDrawable_idle: null,
	markerDrawable_selected: null,
	markerDrawable_directionIndicator: null,
	locationUpdateCounter: 0,
	updatePlacemarkDistancesEveryXLocationUpdates: 10,

	// Liste
	markerList: [],

	// Dernier marker select
	currentMarker: null,

	loadPoisFromJsonData: function loadPoisFromJsonDataFn(poiData) {
		// Reset
		AR.context.destroyAll();
		// Affiche radar
		PoiRadar.show();
		// Marker visible
		World.markerList = [];
		// Instanciation marker
		World.markerDrawable_idle = new AR.ImageResource("assets/marker_idle.png");
		World.markerDrawable_selected = new AR.ImageResource("assets/marker_selected.png");
		World.markerDrawable_directionIndicator = new AR.ImageResource("assets/indi.png");
		// Création des markers
		for (var currentPlaceNr = 0; currentPlaceNr < poiData.length; currentPlaceNr++) {
			var singlePoi = {
				//"id": poiData[currentPlaceNr].id,
				"latitude": parseFloat(poiData[currentPlaceNr].lat),
				"longitude": parseFloat(poiData[currentPlaceNr].lng),
				//"altitude": parseFloat(poiData[currentPlaceNr].altitude),
				"title": poiData[currentPlaceNr].nom,
				"description": poiData[currentPlaceNr].type
			};
			World.markerList.push(new Marker(singlePoi));
		}
		World.updateDistanceToUserValues();
		// Set slider distance
		$("#panel-distance-range").val(2500);
		$("#panel-distance-range").slider("refresh");
		World.updateRangeValues();
	},

	updateDistanceToUserValues: function updateDistanceToUserValuesFn() {
		for (var i = 0; i < World.markerList.length; i++) {
			World.markerList[i].distanceToUser = World.markerList[i].markerObject.locations[0].distanceToUser();
		}
	},

	// Redirection vers native screen
	onPoiDetailMoreButtonClicked: function onPoiDetailMoreButtonClickedFn() {
		//var currentMarker = World.currentMarker;
		//var architectSdkUrl = "architectsdk://markerselected?id=" + encodeURIComponent(currentMarker.poiData.id) + "&title=" + encodeURIComponent(currentMarker.poiData.title) + "&description=" + encodeURIComponent(currentMarker.poiData.description);
		//document.location = architectSdkUrl;
	},

	// Appellée lors de ArchitectView.setLocation()
	locationChanged: function locationChangedFn(lat, lon, alt, acc) {
		World.userLocation = {
			'latitude': lat, 'longitude': lon, 'altitude': alt, 'accuracy': acc
		};
		if (!World.initiallyLoadedData) {
			World.requestDataFromLocal(lat, lon);
			World.initiallyLoadedData = true;
		} else if (World.locationUpdateCounter === 0) { World.updateDistanceToUserValues(); }
		World.locationUpdateCounter = (++World.locationUpdateCounter % World.updatePlacemarkDistancesEveryXLocationUpdates);
	},

	// Appelée lors de la selection d'un marker
	onMarkerSelected: function onMarkerSelectedFn(marker) {
		if (World.currentMarker) {
			if (World.currentMarker.poiData.id != marker.poiData.id) {
				World.currentMarker.setDeselected(World.currentMarker);
			}
		}
		marker.setSelected(marker);
		World.currentMarker = marker;
		// Marker details panel
		$("#poi-detail-title").html(marker.poiData.title);
		$("#poi-detail-description").html(marker.poiData.description);
		// Distance restau/utilisateur
		var distanceToUserValue = (marker.distanceToUser > 999) ? ((marker.distanceToUser / 1000).toFixed(2) + " km") : (Math.round(marker.distanceToUser) + " m");
		$("#poi-detail-distance").html(distanceToUserValue);
		$("#panel-poidetail").panel("open", 123);
		$(".ui-panel-dismiss").unbind("mousedown");
		$("#panel-poidetail").on("panelbeforeclose", function(event, ui) {
			World.currentMarker.setDeselected(World.currentMarker);
		});
	},

	// Appelée lors d'un click sur écran
	onScreenClick: function onScreenClickFn() {
		if (World.currentMarker) { World.currentMarker.setDeselected(World.currentMarker); }
	},

	// Appelée lors d'un changement de distance
	updateRangeValues: function updateRangeValuesFn() {
		// Maj via valeur slider
		var maxRangeMeters = $("#panel-distance-range").val();
		var maxRangeValue = (maxRangeMeters > 999) ? ((maxRangeMeters / 1000).toFixed(2) + " km") : (Math.round(maxRangeMeters) + " m");
		var placesInRange = World.getNumberOfVisiblePlacesInRange(maxRangeMeters);
		// Set infos
		$("#panel-distance-value").html(maxRangeValue);
		$("#panel-distance-places").html((placesInRange != 1) ? (placesInRange + " Restaurants") : (placesInRange + " Restaurant"));
		AR.context.scene.cullingDistance = Math.max(maxRangeMeters, 1);
		PoiRadar.setMaxDistance(Math.max(maxRangeMeters, 1));
	},

	// Retourne le nb restaurant visible
	getNumberOfVisiblePlacesInRange: function getNumberOfVisiblePlacesInRangeFn(maxRangeMeters) {
		World.markerList.sort(World.sortByDistanceSorting);
		for (var i = 0; i < World.markerList.length; i++) {
			if (World.markerList[i].distanceToUser > maxRangeMeters) {
				return i;
			}
		};
		return World.markerList.length;
	},

	// Appelée lors de l'affichage du panel distance
	handlePanelMovements: function handlePanelMovementsFn() {
		// Panel fermé
		$("#panel-distance").on("panelclose", function(event, ui) {
			$("#radarContainer").addClass("radarContainer_left");
			$("#radarContainer").removeClass("radarContainer_right");
			PoiRadar.updatePosition();
		});
		// Panel ouvert
		$("#panel-distance").on("panelopen", function(event, ui) {
			$("#radarContainer").removeClass("radarContainer_left");
			$("#radarContainer").addClass("radarContainer_right");
			PoiRadar.updatePosition();
		});
	},

	// Affichage panel distance au click btn
	showRange: function showRangeFn() {
		if (World.markerList.length > 0) {
			// Maj label
			$('#panel-distance-range').change(function() {
				World.updateRangeValues();
			});
			World.updateRangeValues();
			World.handlePanelMovements();
			// Ouverture panel
			$("#panel-distance").trigger("updatelayout");
			$("#panel-distance").panel("open", 1234);
		}
	},

	// Chargement des données local
	requestDataFromLocal: function requestDataFromLocalFn(centerPointLatitude, centerPointLongitude) {
		var poiData = [];
		$.getJSON( "../data.json", function(data) {
		 	World.loadPoisFromJsonData(data);
		});
	},

	// Retourne markers classés par distance
	sortByDistanceSorting: function(a, b) {
		return a.distanceToUser - b.distanceToUser;
	}
};
AR.context.onLocationChanged = World.locationChanged;
AR.context.onScreenClick = World.onScreenClick;