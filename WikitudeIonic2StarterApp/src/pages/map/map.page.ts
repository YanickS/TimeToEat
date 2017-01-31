import { Component } from '@angular/core';

import { IMarker, IPoint } from './interfaces';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'map.html'
})
export class MapPage {
  public markers: IMarker[];
  public origin: IPoint;
  public zoom: number;

  constructor(public http: Http) {
    this.initMarkers();
    this.origin = {
      lat: 51.673858,
      lng: 7.815982
    };
    this.zoom = 8;
  }

  public clickedMarker(label: string) {
    window.alert(`clicked the marker: ${label || ''}`);
  }

  private initMarkers(): void {
    this.http.get('assets/data.json')
      .map((res) => res.json())
      .subscribe(data => {
        for(let marker of data) {
          this.markers = [{lat: marker.lat, lng: marker.lng, label: marker.nom}];
        }
      });




    /*this.markers = [{
      lat: 51.673858,
      lng: 7.815982,
      label: 'A'
    }, {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B'
    }, {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C'
    }];*/
  }
}
