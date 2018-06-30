import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SpeedometerPage } from '../pages/speedometer/speedometer';
import { Geolocation } from '@ionic-native/geolocation';
import { SettingsPage } from '../pages/settings/settings';
import { SettingsDetailPage } from '../pages/settings-detail/settings-detail';
import { Globalvariables } from '../providers/globalvariables/globalvariables';
import { ViewPage } from '../pages/view/view';
import { GoogleMaps } from '@ionic-native/google-maps';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SpeedometerPage,
    SettingsPage,
    SettingsDetailPage,
    ViewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SpeedometerPage,
    SettingsPage,
    SettingsDetailPage,
    ViewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    Globalvariables,
    GoogleMaps
  ]
})
export class AppModule {}
