import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  report : any  = {}
  coments : any = [
    {
      id:0,
      name : "Persona",
      detail : "Mira la pagina http://ambientebogota.gov.co/web/arboles-en-riesgo",
      thumbnail : "https://via.placeholder.com/60x60"
    },
    {
      id:1,
      name : "Persona",
      detail : "Mira la pagina http://ambientebogota.gov.co/web/arboles-en-riesgo",
      thumbnail : "https://via.placeholder.com/60x60"
    },
    {
      id:2,
      name : "Persona",
      detail : "Mira la pagina http://ambientebogota.gov.co/web/arboles-en-riesgo",
      thumbnail : "https://via.placeholder.com/60x60"
    }
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {  
    this.report = this.navParams.get('report');
    console.log(this.report);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
