import { Component, NgZone } from '@angular/core';
import {
  GoogleMap,
  GoogleMapOptions,
  GoogleMaps,
  GoogleMapsEvent,
  Marker,
  MarkerCluster,
  MarkerClusterOptions,
  MarkerOptions,
} from '@ionic-native/google-maps';
import { Loading, LoadingController, NavController, Platform } from 'ionic-angular';

import prospectMock from '../../providers/prospect/prospect-mock';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map?: GoogleMap;
  showInfo: boolean;
  dadosProspect: any = {};
  prospects: any = [];
  title: string = "Prospects nas Proximidades";
  loader: Loading;

  constructor(public navCtrl: NavController, public ngZone: NgZone, public platform: Platform, private loadingCtrl: LoadingController) {

  }
  goTo() {
    this.navCtrl.push('NovaPaginaPage')
  }

}
