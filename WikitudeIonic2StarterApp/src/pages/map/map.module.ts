import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { MapPage } from './map.page';
import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  declarations: [MapPage],
  entryComponents: [MapPage],
  imports: [IonicModule, AgmCoreModule]
})
export class MapModule {

}
