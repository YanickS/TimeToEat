import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class GoogleMapService {

  constructor(private http: Http) {
    console.log('Locations service started...');
  }

  getLocations() {
    return this.http.get('../assets/data.json')
      .map(res => res.json());
  }
}
