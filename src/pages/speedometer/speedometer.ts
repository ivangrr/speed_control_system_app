import { Component } from '@angular/core';
import { IonicPage, Platform, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Globalvariables } from '../../providers/globalvariables/globalvariables';

/**
 * Generated class for the SpeedometerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-speedometer',
  templateUrl: 'speedometer.html',
})
export class SpeedometerPage {
  speed = 0;
  measureUnit;
  navigator: any;
  geo;
  watchId;
  isDriving = false;
  // speed vector in mps
  mockSpeed = [ 2.78, 5.56, 8.33, 11.11, 13.89, 16.67, 18.056, 12.5, 13.89, 11.11, 9.72, 8.33, 12.5, 13.89, 15.27, 16.67, 19.44, 20.83, 19.44, 18.056, 16.67, 13.89, 12.5, 8.33, 5.56, 4.17, 1.389, 0];

  constructor(public globalVariables: Globalvariables,
            private geolocation: Geolocation,
            public platform: Platform,
            public toastCtrl: ToastController,
            public globalVariable: Globalvariables) {  }

  ionViewDidLoad() { }

  ionViewDidEnter(){    
    this.measureUnit = this.globalVariables.getMeasureUnit();
  }

  ionViewDidLeave(){ }

  getPosition(){
    // Watch geolocation
    this.geo = this.geolocation.watchPosition().subscribe((position) => {
      if(position.coords !== undefined){
        this.speed = isNaN(position.coords.speed) ? 0 : position.coords.speed;
        this.getMeasureUnit();
      } else {
        this.showMessage('Problem to position in geolocation');
        this.geo.unsubscribe();
      }
    });
  }

  getMeasureUnit(){
    switch(this.measureUnit){
      case 'Km/h':
        this.speed = Math.round(this.speed * 3.6);
        break;
      case 'mph':
        this.speed = Math.round(this.speed * 2.23694);
        break;
      default:
        this.speed = Math.round(this.speed);
    }
  }

  getMockPosition(){
    let i = 0; 
    let intervalId = setInterval(() => {
      if(i < this.mockSpeed.length && this.isDriving){
        this.speed = this.mockSpeed[i];
        this.getMeasureUnit();
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, 500);
  }

  showMessage(messageToShow: string) {
    const toast = this.toastCtrl.create({
      message: messageToShow,
      showCloseButton: true,
      closeButtonText: 'x'
    });
    toast.present();
  }

  startDriving(){
    this.isDriving = true;
    this.globalVariables.setOrigin();
    // Test mode
    if(this.globalVariable.getMode() === 'test'){
      this.getMockPosition();
    } else { // Real mode
      this.getPosition();
    }
  }

  stopDriving(){
    this.isDriving = false;
    this.globalVariables.setDestiny();
    this.showMessage('The car has stopped');
  }

}
