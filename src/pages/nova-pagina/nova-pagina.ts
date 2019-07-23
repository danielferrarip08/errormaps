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
import { IonicPage, Loading, LoadingController, NavController, Platform } from 'ionic-angular';

import prospectMock from '../../providers/prospect/prospect-mock';


@IonicPage()
@Component({
  selector: 'page-nova-pagina',
  templateUrl: 'nova-pagina.html',
})
export class NovaPaginaPage {

  map?: GoogleMap;
  showInfo: boolean;
  dadosProspect: any = {};
  prospects: any = [];
  title: string = "Prospects nas Proximidades";
  loader: Loading;

  constructor(public navCtrl: NavController, public ngZone: NgZone, public platform: Platform, private loadingCtrl: LoadingController) {
    this.prospects = prospectMock.prospects;
    console.log(this.prospects)
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.loadMap("-24.728839", "-53.737562");
    })
  }

  loadMap(lat, long) {
    this.loader = this.loadingCtrl.create({ content: "Carregando mapa..." });
    this.loader.present();

    this.showInfo = false;

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: { lat: lat, lng: long },
        zoom: 16
      },
      controls: {
        myLocationButton: true,
        zoom: true
      }
    };

    this.map = GoogleMaps.create('map', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {

        let markers: Array<MarkerOptions> = [];
        this.prospects.forEach(element => {
          markers.push({
            position: { lat: element.geoLatitude, lng: element.geoLongitude },
            prospect: JSON.stringify(element)
          });
        });

        let markerOptions: MarkerClusterOptions = {
          icons: [{ url: '', min: 10, max: 50, }, { url: '', min: 51, max: 100, }],
          markers: markers,
          boundsDraw: false
        };

        this.map.addMarkerCluster(markerOptions)
          .then((markerCluster: MarkerCluster) => {
            this.loader.dismiss();
            markerCluster.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe((marker: Marker) => {
                this.dadosProspect = JSON.parse(marker[1].get("prospect"));
                this.showInfo = true;
                this.ngZone.run(() => { });
                this.map.setOptions({ gestures: { scroll: false } });
              });
          });
      });
  }

  fecharInfo() {
    this.showInfo = false;
    this.map.setOptions({ gestures: { scroll: true } });
  }

  gerenciar(prospect) {
    //TODO
  }

}
