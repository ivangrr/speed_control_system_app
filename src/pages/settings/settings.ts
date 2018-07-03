import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SettingsDetailPage } from '../settings-detail/settings-detail';
import { Globalvariables } from '../../providers/globalvariables/globalvariables';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  items = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public platform: Platform,
              public globalVariables: Globalvariables) { }

  ionViewDidEnter(){
    this.items = [
      {
        'id': 'measure-unit',
        'title': 'Measure Units',
        'icon': 'alarm',
        'description': 'Measure Units.',
        'color': '#BAB6B6'
      },
      {
        'id': 'mode',
        'title': 'Mode',
        'icon': 'switch',
        'description': 'Mode',
        'color': '#BAB6B6'
      }
    ];
  }

  ionViewDidLoad() { }

  openNavDetailsPage(item){
    this.navCtrl.push(SettingsDetailPage, { item: item });
  }

}
