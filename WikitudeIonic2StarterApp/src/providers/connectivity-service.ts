import { Injectable } from '@angular/core';
import { Network } from 'ionic-native';
import { Platform } from 'ionic-angular';
declare var type;
@Injectable()
export class ConnectivityService {
  onDevice: boolean;
  constructor(public platform: Platform){
    this.onDevice = this.platform.is('cordova');
  }
  isOnline(): boolean {
    if(this.onDevice && Network.type){
      return Network.type !== type.NONE;
    } else {
      return navigator.onLine;
    }
  }
  isOffline(): boolean {
    if(this.onDevice && Network.type){
      return Network.type === type.NONE;
    } else {
      return !navigator.onLine;
    }
  }
}
