import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Report } from '../../interfaces/Report';
import { ReportsProvider } from '../../providers/reports/reports';
import { DetailPage } from '../detail/detail';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  lat: number = 0;
  lng: number = 0;
  reports:Report[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private reportsProvider: ReportsProvider) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.showPosition(position);
    });
    this.getReports()
  }
  getReports(){
    this.reports = this.reportsProvider.getReports();
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

}
