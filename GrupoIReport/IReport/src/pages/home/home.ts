import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ReportFormPage } from '../report-form/report-form';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  reports:any = [
    {
      id: 0,
      title : "Hueco peligroso",
      description : "Hay un hueco en la calle que va a matar a alguien ayuda porfa!!!",
      img : "https://static.iris.net.co/semana/upload/images/2017/4/4/520926_1.jpg",
      rating : 5,
      solved : false
  },
  {
    id: 1,
    title : "Arbol caido",
    description : "Hay un arbol que se cayo esta mañana por y no se que hacer alguien me ayuda!",
    img : "http://www.eltiempo.com/contenido///bogota/IMAGEN/IMAGEN-15324359-2.png",
    rating : 15,
    solved : true
  }
]
  constructor(public navCtrl: NavController) {

  }

  add(){
    this.navCtrl.push(ReportFormPage);
  }
  view(id){
    console.log(this.reports[id])
    this.navCtrl.push(DetailPage, {report:this.reports[id]});
  }
}
