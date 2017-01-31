import { Component, ViewChild } from '@angular/core';
import { Tabs} from 'ionic-angular';
import { HomePage } from '../home/home';
import { ARView } from '../ar-view/ar-view';
import { MapPage } from '../map/map';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('myTabs') public tabRef: Tabs;

  tab1Root: any = HomePage;
  tab2Root: any = MapPage;
  tab3Root: any = ARView;

  constructor() {
  }

  public selectTab(index: number) {
    this.tabRef.select(index);
  }
}
