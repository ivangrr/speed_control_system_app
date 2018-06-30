import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Globalvariables } from '../../providers/globalvariables/globalvariables';

/**
 * Generated class for the SettingsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings-detail',
  templateUrl: 'settings-detail.html',
})
export class SettingsDetailPage {
  item;
  measureUnitsGroup: FormGroup;
 
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              public globalVariable: Globalvariables) {
    this.item = navParams.data.item;
    this.measureUnitsGroup = this.formBuilder.group({
      'measureUnit': [globalVariable.getMeasureUnit()]
    });
  }

  ionViewDidLoad() {
  }

  setMeasureUnit(){
    this.globalVariable.setMeasureUnit(this.measureUnitsGroup.value.measureUnit);
  }  


}
