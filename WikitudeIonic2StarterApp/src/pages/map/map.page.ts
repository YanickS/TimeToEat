import { Component } from '@angular/core';

import { IMarker, IPoint } from './interfaces';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { RestaurantDetailPage } from '../restaurant-detail/restaurant-detail';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'map.html'
})
export class MapPage {
  public markers: IMarker[];
  public origin: IPoint;
  public zoom: number;

  constructor(public http: Http, public navcontroller: NavController) {
    this.markers = [];
    this.initMarkers();
    this.origin = {
      lat: 44.8333,
      lng: -0.5667
    };
    this.zoom = 12;
  }

  public clickedMarker(id: number) {
    this.navcontroller.push(RestaurantDetailPage, {
      restaurant_id: id
    });
  }

  private initMarkers(): void {
    this.http.get('assets/data.json')
      .map((res) => res.json())
      .subscribe(data => {
        for(var i = 0; i < data.length; i++){
          this.markers.push({id: data[i].id, lat: data[i].lat, lng:  data[i].lng, label:  data[i].nom});
        }
      });
  }
}
