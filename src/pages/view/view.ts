import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Globalvariables } from '../../providers/globalvariables/globalvariables';

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
  infoView = {};
  infoViewMock = {
    gpsData: {
      distance: 8.9481,
      time: 16.41,
      speedMax: 86.41,
      speedAvg: 32.18
    },
    logsData: {
      maf: {
        minValue: 2.67,
        maxValue: 73.45,
        avgValue: 12.464
      },
      speed: {
        minValue: 0,
        maxValue: 88,
        avgValue: 33.618
      }
    }
  };
  origin = {};

  constructor(public globalVariables: Globalvariables) { 
    // Test mode
    if(globalVariables.getMode() === 'test'){
      this.infoView = this.infoViewMock;
    } else { // Real mode
      // call the service
      this.infoView = this.infoViewMock;
    }            
  }

  ionViewDidEnter(){
   if(this.globalVariables.getOrigin().latitude === 0){
      this.globalVariables.setOrigin();
    }
  }

  showMap() {
    this.hiddenMap = false;

    if(this.globalVariables.getDestiny().latitude === 0){
      // Position par default
      let latitude = this.globalVariables.uqtrPoint.latitude;
      let longitude = this.globalVariables.uqtrPoint.longitude;
      let content = '<h4>UQTR Position</h4>';

      if(this.globalVariables.getOrigin().latitude !== 0){
        latitude = this.globalVariables.getOrigin().latitude;
        longitude = this.globalVariables.getOrigin().longitude;
        content = '<h4>Current Position</h4>';
      }

      this.setPosition(latitude, longitude);
      // Market Current Position
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: {
          lat: latitude,
          lng: longitude
        }
      });
      
      this.addInfoWindow(marker, content);

    } else {
      this.setPosition(this.globalVariables.getOrigin().latitude, this.globalVariables.getOrigin().longitude);
      this.drawRouteInMap(this.map, this.globalVariables.getOrigin());
    }

  }

  drawRouteInMap(map, coord){
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);
      
    var start = coord.latitude + ', ' + coord.longitude;
    var end = this.globalVariables.getDestiny().latitude + ', ' + this.globalVariables.getDestiny().longitude;
    directionsService.route({
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          console.log('Directions request failed due to ' + status);
        }
    });
  }

  addInfoWindow(marker, content){
 
    const infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
   
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
