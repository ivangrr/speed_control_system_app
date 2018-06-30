import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpeedometerPage } from './speedometer';

@NgModule({
  declarations: [
    SpeedometerPage,
  ],
  imports: [
    IonicPageModule.forChild(SpeedometerPage),
  ]
})
export class SpeedometerPageModule {}
