import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DetailPage } from '../detail/detail';
import { Report } from '../../interfaces/Report';
import { storage} from 'firebase'
import { AngularFireDatabase  } from 'angularfire2/database';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the ReportFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-report-form',
  templateUrl: 'report-form.html',
})
export class ReportFormPage {
  private report: FormGroup;
  base64Image : string;
  private loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private imagePicker: ImagePicker,
    private camera: Camera,
    private db: AngularFireDatabase,
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController)
    {
    this.report= this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      icon : ['', Validators.required]
    });
  }
  reportSolution(type){
    switch (type) {
      case 'nature.png':
        return true;
      default:
        return false;
    }
  }

  saveReport(getLat, getLng){
    let reportData : Report = {
      id : 5,
      title : this.report.value.title,
      description: this.report.value.description,
      img : "https://firebasestorage.googleapis.com/v0/b/ireport-bc669.appspot.com/o/ReportsPictures%2F"+this.report.value.title+"?alt=media",
      rating : 0,
      solved : this.reportSolution(this.report.value.icon),
      lat : getLat,
      lng : getLng,
      icon : this.report.value.icon
   }
   this.saveSpinner();
   this.db.list('Reports').push(reportData);
   let img = storage().ref('ReportsPictures/'+reportData.title).putString(this.base64Image, 'data_url')
   .then(()=>{
      this.loading.dismiss();
      this.navCtrl.setRoot(DetailPage, {report:reportData});
   });
  }
  saveSpinner(){
    this.loading = this.loadingCtrl.create({

      content: 'Guardando reporte, porfavor espere'
    });
    this.loading.present();
  }
  ReportView() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.saveReport(resp.coords.latitude, resp.coords.longitude)
     }).catch((error) => {
      this.toastCtrl.create({
        message: 'Error al traer las cordenadas',
        duration: 3000,
        position: 'bottom'
      });
     });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportFormPage');
  }
  onSelectPhoto() {
    const options = {
      maximumImagesCount: 1,
      width: 900,
      heigth: 500,
      quality: 75,
      outputType: 1
    };
    this.imagePicker.getPictures(options)
      .then((results) => {
        this.base64Image = 'data:image/jpeg;base64,' + results;
      }, (err) => {
        this.toastCtrl.create({
          message: 'Error al seleccionar la imagen',
          duration: 3000,
          position: 'bottom'
        });
      });
  }
  getPicture(){
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 900,
      targetHeight : 500,
      correctOrientation: true
    }
    this.camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):

      this.base64Image = 'data:image/jpeg;base64,' + imageData;
     
      
     }, (err) => {
      this.toastCtrl.create({
        message: 'Error al tomar la foto',
        duration: 3000,
        position: 'bottom'
      });
     });
  }

}
