import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'item-details.html'
})

export class ItemDetailsPage {
  item: any;

  constructor(public navcontroller: NavController, public navparams: NavParams) {
    this.item = navparams.get('item');
  }

  openMap(item: any) {
    this.navcontroller.push(AboutPage, {
      item: item
    });
  }
}
