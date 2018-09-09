import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ReportFormPage } from '../report-form/report-form';
import { DetailPage } from '../detail/detail';
import { Report } from '../../interfaces/Report';
import { ReportsProvider } from '../../providers/reports/reports';
import { Geolocation } from '@ionic-native/geolocation';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lat: number = 0;
  lng: number = 0;
  reports:Report[];

  constructor(public navCtrl: NavController, private reportsProvider: ReportsProvider,private geolocation: Geolocation) {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
      this.showPosition(resp);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    
    navigator.geolocation.getCurrentPosition((position) => {
      this.showPosition(position);
    });
    this.getReports()
  }
  ionViewDidLoad() {
    
  }

  getReports(){
    this.reports = this.reportsProvider.getReports();
  }

  add(){
    this.navCtrl.push(ReportFormPage);
  }
  view(id){
    console.log(this.reports[id])
    this.navCtrl.push(DetailPage, {report:this.reports[id]});
  }
  showPosition(location: Position){
    this.lat = location.coords.latitude
    this.lng = location.coords.longitude
  }
  positionClick(id){
    this.view(id);
  }
}
