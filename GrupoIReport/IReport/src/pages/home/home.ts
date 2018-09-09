import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ReportFormPage } from '../report-form/report-form';
import { DetailPage } from '../detail/detail';
import { Report } from '../../interfaces/Report';
import { ReportsProvider } from '../../providers/reports/reports';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/Auth.service';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lat: number = 0;
  lng: number = 0;
  reports:Report[];

  constructor(public navCtrl: NavController, private reportsProvider: ReportsProvider,
    private geolocation: Geolocation,private storage: Storage,private auth: AuthProvider,private toastCtrl: ToastController) {
    

    this.storage.get('user').then((data) => {
      if(data!= null){
        this.auth.user.emit(data);
      }
    });
    
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
      this.showPosition(resp);
     }).catch((error) => {
      this.toastCtrl.create({
        message: 'Error al traer las cordenadas',
        duration: 3000,
        position: 'bottom'
      });
     });
    navigator.geolocation.getCurrentPosition((position) => {
      this.showPosition(position);
    });
    this.getReports()
  }
  ionViewDidLoad() {
    
  }

  getReports(){
    this.reportsProvider.getReports().subscribe((data)=>{
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

  add(){
    this.navCtrl.push(ReportFormPage);
  }
  view(report : Report){
    console.log(report)
    this.navCtrl.push(DetailPage, {report:report});
  }
  showPosition(location: Position){
    this.lat = location.coords.latitude
    this.lng = location.coords.longitude
  }
  positionClick(report){
    this.view(report);
  }
}
