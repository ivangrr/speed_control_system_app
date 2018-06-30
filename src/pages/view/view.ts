import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html'
})
export class ViewPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  views: string = "info";
  hiddenMap = true;
  latitude;
  longitud; 

  constructor(private geolocation: Geolocation) {

  }

  ngAfterViewInit(){
    //Set latitude and longitude of some place
    // this.initMap();
  }

  ionViewDidLoad() {
    
  }

  showMap() {
    /*
    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
    };
    */
    // this.map = GoogleMaps.create('map', mapOptions);
    this.hiddenMap = false;
    
    this.geolocation.getCurrentPosition().then((position) => {
      this.setPosition(position.coords.latitude, position.coords.longitude);
    });

    /*
    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
    */
  }

  setPosition(latitude: number, longitud: number){
    let latLng = new google.maps.LatLng(latitude, longitud);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  hideMap(){
    this.hiddenMap = true;
  }

}
