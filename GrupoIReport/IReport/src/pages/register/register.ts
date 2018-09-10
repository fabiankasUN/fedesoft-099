import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/Auth.service';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {
  Name: string;
  Email: string;
  Password: string;


  constructor(public navCtrl: NavController, public navParams: NavParams
              ,public auth: AuthProvider, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  login(){
    this.navCtrl.setRoot(LoginPage);
  }
  signup(){
    if(this.Email == undefined || this.Name == undefined || this.Password == undefined){
      this.toastCtrl.create({
        message: 'Empty fields',
        duration: 3000,
        position: 'bottom'
      }).present();
    }else{
      this.auth.emailSignUp(this.Email,this.Password,this.Name);
      this.navCtrl.setRoot(HomePage);
    }
    
  }

}
