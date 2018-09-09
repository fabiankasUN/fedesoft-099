import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ReportFormPage } from '../report-form/report-form';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public storage: Storage) {
    
  }

  add(){
    this.navCtrl.push(ReportFormPage);
  }
}
