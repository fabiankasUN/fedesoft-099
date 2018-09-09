import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/Auth.service';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  Email: string;
  Password: string;
  suscriptor: any;
  user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public storage: Storage,public auth: AuthProvider, private toastCtrl: ToastController) {

    if(this.storage !=null)
      this.storage.get('user').then((val)=>{
        if(val!=null){
          this.navCtrl.setRoot(HomePage);
        }
      });
  }

  login(){
    if(this.Email == undefined || this.Password == undefined){
      this.toastCtrl.create({
        message: 'Empty fields',
        duration: 3000,
        position: 'bottom'
      }).present();
    }else{
      this.auth.emailLogin(this.Email,this.Password).then((data) => {
        if(this.auth.authenticated)
          this.navCtrl.setRoot(HomePage);
      });
    }
    
    
  }

  googleLogin() {
    this.toastCtrl.create({
            message: 'Not implemented yet',
            duration: 3000,
            position: 'bottom'
          }).present();
    // this.auth.googleLogin().then(()=>{
    //   if (this.auth.authenticated){
    //     this.navCtrl.setRoot(HomePage);
    //   }else{
    //     this.toastCtrl.create({
    //       message: 'Usuario incorrecto',
    //       duration: 3000,
    //       position: 'bottom'
    //     }).present();
    //   }
    // });
  }

  facebookLogin() {
    this.toastCtrl.create({
      message: 'Not implemented yet',
      duration: 3000,
      position: 'bottom'
    }).present();
    // this.auth.facebookLogin().then(()=>{
    //   if (this.auth.authenticated){
    //     this.navCtrl.setRoot(HomePage);
    //   }else{
    //     this.toastCtrl.create({
    //       message: 'Usuario incorrecto',
    //       duration: 3000,
    //       position: 'bottom'
    //     }).present();
    //   }
    // });
  }

  twitterLogin() {
    this.auth.twitterLogin();
  }

  register(){
    console.log('asdsadasd');
    this.navCtrl.setRoot(RegisterPage);
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
