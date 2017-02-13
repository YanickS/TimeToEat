import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Http } from "@angular/http";
import { MapPage } from '../map/map.page';

declare var cordova: any;

@Component({
  templateUrl: 'restaurant-detail.html'
})

export class RestaurantDetailPage {
  public restaurant: any;

  constructor(public navcontroller: NavController, public navparams: NavParams, public platform: Platform, public http: Http) {
    this.restaurant = [];
    this.http.get('assets/data.json').subscribe((success) => {
      var data = success.json();
      for(var i = 0; i < data.length; i++){
          if(data[i].id == navparams.get('restaurant_id')){
              this.restaurant = data[i];
          }
      }
    },(error)=>{
        console.log(JSON.stringify(error));
    });
  }

  public openMap(restaurant: any) {
    this.navcontroller.push(MapPage, {
      restaurant: restaurant
    });
  }

  public launch(url) {
    this.platform.ready().then(() => {
      cordova.InAppBrowser.open(url, "_system", "location=true");
    });
  }
}
