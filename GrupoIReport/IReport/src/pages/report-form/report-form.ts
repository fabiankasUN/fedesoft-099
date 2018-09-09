import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DetailPage } from '../detail/detail';
import { Report } from '../../interfaces/Report';
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
  private options = {
    maximumImagesCount: 1,
    width: 100,
    heigth: 100,
    quality: 75,
    outputType: 1
  };
  private cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private imagePicker: ImagePicker,
    private camera: Camera
  ) {
    this.report= this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  ReportView() {
    console.log(this.report.value);
    let getLat = 0;
    let getLng = 0;
    navigator.geolocation.getCurrentPosition((position) => {
      getLat = position.coords.latitude;
      getLng = position.coords.longitude;
    });
    let reportData : Report = {
       id : 4,
       title : this.report.value.title,
       description: this.report.value.description,
       img : "https://www.doi.gov/sites/doi.gov/files/uploads/yosemitewinteralpenglowkaricobb1.jpg",
       rating : 0,
       solved : false,
       lat : getLat,
       lng : getLng,
       icon : 'doodle/40/000000/fire-element'
    }
    this.navCtrl.setRoot(DetailPage, {report:reportData});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportFormPage');
  }
  onSelectPhoto() {

    this.imagePicker.getPictures(this.options)
      .then((results) => {
        this.base64Image = 'data:image/jpeg;base64,' + results;
      }, (err) => {
        console.log('error')
      });
  }
  getPicture(){
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
     });
  }

}
