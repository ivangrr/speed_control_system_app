import { Component } from '@angular/core';
import { Platform, NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loginGroup: FormGroup;
  user;
  isCheck = false;
  

  constructor(public navCtr: NavController,
              public platform: Platform,
              private storage: Storage,
              private formBuilder: FormBuilder,
              public toastCtrl: ToastController) {
    this.loginGroup = this.formBuilder.group({
      'user': [],
      'password': []
    });
  }

  login(){
    if(this.loginGroup.controls['user'].value === 'admin' && 
      this.loginGroup.controls['password'].value === 'admin'){
      this.storage.set('user', this.loginGroup.controls['user'].value);
      this.user = this.loginGroup.controls['user'].value;   
      this.storage.set('login', true);
      this.isCheck = true;
    }
  }

  ionViewDidEnter(){
    this.storage.get('login').then((value) => {
      if(value !== null){
        this.isCheck = true;
      }
    });
    this.storage.get('user').then((value) => {
      this.user = value;
    });
  }

  logOut(){
    this.storage.remove('login').then(() => {
      this.isCheck = false;
      this.storage.remove('user');
      this.loginGroup.controls['user'].setValue('');
      this.loginGroup.controls['password'].setValue('');
      this.showMessage('The logout was done successful');
    });

  }

  showMessage(messageToShow: string) {
    const toast = this.toastCtrl.create({
      message: messageToShow,
      showCloseButton: true,
      closeButtonText: 'x'
    });
    toast.present();
  }
}
