import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { Report } from '../../interfaces/Report';
import { ReportsProvider } from '../../providers/reports/reports';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the WallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-wall',
  templateUrl: 'wall.html',
})
export class WallPage {
  reports:Report[]; 
  constructor(public navCtrl: NavController, public navParams: NavParams, private reportsProvider: ReportsProvider,private toastCtrl: ToastController) {
    this.getReports();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WallPage');
  }

  getReports(){
    this.reportsProvider.getReports().subscribe((data)=>{
      console.log(data);
      this.reports = data as Report[];
    },
    (err)=>{
      this.toastCtrl.create({
        message: 'Error al traer los reportes',
        duration: 3000,
        position: 'bottom'
      });
    });
  }
  view(report : Report){
    console.log(report)
    this.navCtrl.push(DetailPage, {report:report});
  }
}
