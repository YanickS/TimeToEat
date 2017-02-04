import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { MapPage } from '../map/map.page';

declare var cordova: any;

@Component({
  templateUrl: 'restaurant-detail.html'
})

export class RestaurantDetailPage {
  restaurant: any;

  constructor(public navcontroller: NavController, public navparams: NavParams, public platform: Platform) {
    this.restaurant = navparams.get('restaurant_id');
  }

  openMap(restaurant: any) {
    this.navcontroller.push(MapPage, {
      restaurant: restaurant
    });
  }

  launch(url) {
    this.platform.ready().then(() => {
      cordova.InAppBrowser.open(url, "_system", "location=true");
    });
  }
}
