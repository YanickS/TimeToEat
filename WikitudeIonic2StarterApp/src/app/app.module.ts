import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { TabsPage } from '../pages/tabs/tabs';
import { ARView } from '../pages/ar-view/ar-view';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import { ConnectivityService } from '../providers/connectivity-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    ItemDetailsPage,
    TabsPage,
    ARView
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyDf474RjXuiShQZcPRNxLgSzP6EVvDwG_o',
      libraries: ['places']})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    ItemDetailsPage,
    TabsPage,
    ARView
  ],
  providers: [GoogleMapsAPIWrapper, ConnectivityService]
})
export class AppModule {}
