import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the GlobalvariablesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Globalvariables {
  measureUnit;
  mode;

  origin = {
    latitude: 0,
    longitude: 0
  };
  
  destiny = {
    latitude: 0,
    longitude: 0
  };
  
  // Destiny mock in test mode
  uqtrPoint = {
    latitude: 46.347140,
    longitude: -72.576908
  };

  constructor(private geolocation: Geolocation) {
    this.measureUnit = 'Km/h';
    this.mode = 'test';
  }

  setMeasureUnit(value){
    this.measureUnit = value;
  }

  getMeasureUnit(){
    return this.measureUnit;
  }

  setMode(value){
    this.mode = value;
  }

  getMode(){
    return this.mode;
  }

  setOrigin(){
    this.geolocation.getCurrentPosition().then((position) => {
      delete this.origin.latitude;
      this.origin.latitude = position.coords.latitude;
      delete this.origin.longitude;
      this.origin.longitude = position.coords.longitude;
    }).catch((error) =>{
      console.log(error);
    });
  }
  
  getOrigin(){
    return this.origin;
  }

  setDestiny(){
    if(this.getMode() === 'test'){
      this.destiny.latitude = this.uqtrPoint.latitude;
      this.destiny.longitude = this.uqtrPoint.longitude;
    } else {
      this.geolocation.getCurrentPosition().then((position) => {
        delete this.destiny.latitude;
        this.destiny.latitude = position.coords.latitude;
        delete this.destiny.longitude;
        this.destiny.longitude = position.coords.longitude;  
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  getDestiny(){
    return this.destiny;
  }

}
