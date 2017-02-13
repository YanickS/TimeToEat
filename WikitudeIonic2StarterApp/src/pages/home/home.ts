import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { NavController } from 'ionic-angular';
import { RestaurantDetailPage } from '../restaurant-detail/restaurant-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  restaurants: any;
  currentLocation: any;
  filteredRestaurants: any;
  brightness: number;

  // Converts numeric degrees to radians
  toRad(value) {
    return value * Math.PI / 180;
  }

  dist(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = this.toRad(lat2-lat1);
    var dLon = this.toRad(lon2-lon1);
    var newLat1 = this.toRad(lat1);
    var newLat2 = this.toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(newLat1) * Math.cos(newLat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return Math.round(d*100)/100;
  }

  constructor(public navcontroller: NavController, public http: Http) {
    this.restaurants = [];
    this.filteredRestaurants = [];
    this.brightness = 2500;
    // Get current location
    navigator.geolocation.getCurrentPosition(
      position => { // success
        this.currentLocation = position.coords;
        //alert('Lat : ' + position.coords.latitude + 'Lng: ' + position.coords.longitude);
        // Récupération de la liste des restaurants par rapport au sélecteur de distance
        this.http.get('assets/data.json').subscribe((success) => {
          var data = success.json();
          console.log(data);
          for(var i = 0; i < data.length; i++){
            data[i].distance = this.dist(this.currentLocation.latitude, this.currentLocation.longitude, data[i].lat, data[i].lng);
            this.restaurants.push(data[i]);
            if(data[i].distance <= (this.brightness/1000))
              this.filteredRestaurants.push(data[i]);
          }
        }, (error)=>{
            console.log(JSON.stringify(error));
        });
      },
      error => { console.log('code : ' + error.code + 'message: ' + error.message); }
    );
  }

  updateList(){
    this.filteredRestaurants = [];
    for(var i = 0; i < this.restaurants.length; i++){
      if(this.restaurants[i].distance <= (this.brightness/1000))
        this.filteredRestaurants.push(this.restaurants[i]);
      }
  }

  restaurantSelected(restaurant: any) {
    this.navcontroller.push(RestaurantDetailPage, {
      restaurant: restaurant
    });
  }
}
