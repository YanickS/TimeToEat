/// <reference path="WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      /** Enter your Wikitude (trial) License Key here */
      WikitudePlugin._sdkKey = "d9BI20qtaEGd3F4viIOg0QiQkB1AFjCgox3kF3mv6FZoWuz05V0wuLCvqNoY9dR2On+nQFT/+tmJDXV0eDXpb+DNh7X81/nNtdDGi9pEWa0+Wx1FpIXZr8r3Fa0xS9B2y5j3n5o2wnKp0IGCKlS3NWeiIBNvaEyD0Q6b/b0vP+FTYWx0ZWRfX+v+ggVX4P/WSqmyA6o0ULIb1zC8Kkhjlg3d0BJj8KVgavDa+OxugxekhHYFwDRjMGEULgF36ETJRArqdAd2TEeSvnRvzpF1q7cM91IPtgPLD1asO1o98rQegf/DWv+ClfiwDci7w0mdrOBivcb+X8oX8vk25k04S55jsIWRSJdDpwTRauN+Khdn/5uzPMSEMPOMmqG9W20whzAmOMETuv3WXAaoydVQvRSfO1FWArYNZDaGpXk3C7zIlOE7JymTp9NfIkR7Qk221AjILnkJS5PZg/QzVXLrYLsfqbCPbmJ8kgbOuhkx8jE++feZxkD63ZQkXPiiysJJoUO8GYS39V9y3Mx6MUzt2C3+x3hSipJbfgi0FbTwgQQu8sJcZYGw7tZKsvjC5hviD86yuXAUFFb5A6SLS336AyidycVaJDATHHJ3JavS+nx/6lwimlvlF5ru5U/gmspv11RQUSGiuLA0dVHDfwchEFzLkvltzpNOMCtIR9nN9kw=";

      /** Check if your device supports AR */
      WikitudePlugin.isDeviceSupported(
          function(success) {
            console.log("Your platform supports AR/Wikitude. Have fun developing!!");
          },
          function(fail) {
            console.log("Your platform failed to run AR/Wikitude: "+fail);
          },
          [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking 
      );                  

      /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works 
       * through the function below for the direction Ionic2 app --> Wikitude SDK 
       * For calls from Wikitude SDK --> Ionic2 app see the captureScreen example in 
       * WikitudeIonic2StarterApp/www/assets/3_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
      // set the function to be called, when a "communication" is indicated from the AR View  
      WikitudePlugin.setOnUrlInvokeCallback(function(url) {

        // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic2)
        if (url.indexOf('captureScreen') > -1) {
            WikitudePlugin.captureScreen(
                function(absoluteFilePath) {
                    console.log("snapshot stored at:\n" + absoluteFilePath);

                    // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
                    WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath +"');");
                },
                function (errorMessage) {
                    console.log(errorMessage);
                },
                true, null
            );
        } else {
            alert(url + "not handled");
        }
      });

      /**
       * Define the generic ok callback
       */
      WikitudePlugin.onWikitudeOK = function() {
          console.log("Things went ok.");
      }
      
      /**
       * Define the generic failure callback
       */
      WikitudePlugin.onWikitudeError = function() {
          console.log("Something went wrong");
      }

      // Just as an example: set the location within the Wikitude SDK, if you need this (You can get the geo coordinates by using ionic native 
      // GeoLocation plugin: http://ionicframework.com/docs/v2/native/geolocation/
      //WikitudePlugin.setLocation(47, 13, 450, 1);

      /* for Android only
      WikitudePlugin.setBackButtonCallback(
          () => {
              console.log("Back button has been pressed...");
          }
      );                  
      */

    });
  }
}
