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
  // speed vector in mps
  mockSpeed = [ 2.78, 5.56, 8.33, 11.11, 13.89, 16.67, 18.056, 12.5, 13.89, 11.11, 9.72, 8.33, 12.5, 13.89, 15.27, 16.67, 19.44, 20.83, 19.44, 18.056, 16.67, 13.89, 12.5, 8.33, 5.56, 4.17, 1.389, 0];

  constructor(public globalVariables: Globalvariables,
            private geolocation: Geolocation,
            public platform: Platform,
            public toastCtrl: ToastController) {
          // this.isAndroid = platform.is('android');
  }

  ngAfterViewInit(){
    
  }

  ionViewDidLoad() {
    
  }

  ionViewDidEnter(){
    // Geposition mode
    // this.getPosition();
    
    // Default mode
    this.getMockPosition();
  }

  ionViewDidLeave(){    
    // this.harvesine();
    // Stop watch geolocation when using getPosition() method
    // this.geo.unsubscribe();
  }

  getPosition(){
    this.measureUnit = this.globalVariables.getMeasureUnit();
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
    this.measureUnit = this.globalVariables.getMeasureUnit();  
    let intervalId = setInterval(() => {
      if(i < this.mockSpeed.length){
        this.speed = this.mockSpeed[i];
        this.getMeasureUnit();
        i++;
      } else {
        this.showMessage('The car has stopped');
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

  /*
  harvesine(){
    let [pi, asin, sin, cos, sqrt, pow, round] = ['PI', 'asin', 'sin', 'cos', 'sqrt', 'pow', 'round']
                                                .map(k=>{
                                                  Math[k];
                                                  console.log(Math[k]);
                                                });
  }
  */
}
