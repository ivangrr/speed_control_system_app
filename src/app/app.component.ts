import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SpeedometerPage } from '../pages/speedometer/speedometer';
import { SettingsPage } from '../pages/settings/settings';
import { ViewPage } from '../pages/view/view';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  loginPage:any = HomePage;
  speedometerPage:any = SpeedometerPage;
  settingPage:any = SettingsPage;
  viewPage:any = ViewPage;

  //constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // splashScreen.hide();
    });
  }
}

