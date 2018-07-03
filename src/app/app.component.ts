import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

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

  constructor(platform: Platform) {
    platform.ready().then(() => {

    });
  }
}

