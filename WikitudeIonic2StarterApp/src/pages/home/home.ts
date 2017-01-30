import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {Http} from "@angular/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  restaurants: any;

  constructor(public navcontroller: NavController, public http: Http) {
    this.restaurants = [];

    /** Récupération de la liste des restaurants par rapport au sélecteur de distance **/
    this.http.get('assets/data.json').subscribe((success) => {
      var data = success.json();
      console.log(data);
      for(var i = 0; i < data.length; i++){
        data[i].distance = 0;
        this.restaurants.push(data[i])
      }
    }, (error)=>{
        console.log(JSON.stringify(error));
    });
  }
}
