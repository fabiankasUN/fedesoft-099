import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/Auth.service';
import { HomePage } from '../home/home';
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
          // console.log(val);
          this.navCtrl.setRoot(HomePage);
        }
      });
    // auth.user.subscribe((data) => {
    //   console.log('data ' + data.email);
    //   //this.name = data.name;
    //   //this.user.name = data.name;
    //   this.navCtrl.setRoot(HomePage);
    //   this.user = data;

    // });
                
    
    
  }

  login(){
    console.log(this.Email);
  }

  googleLogin() {
    this.auth.googleLogin().then(()=>{
      if (this.auth.authenticated){
        this.navCtrl.setRoot(HomePage);
      }else{
        let toast = this.toastCtrl.create({
          message: 'Usuario incorrecto',
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    });
  }

  facebookLogin() {
    this.auth.facebookLogin();
  }

  twitterLogin() {
    this.auth.twitterLogin();
  }

  register(){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
