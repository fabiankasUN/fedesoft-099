import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DetailPage } from '../pages/detail/detail';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MapPage } from '../pages/map/map';
import { ReportFormPage } from '../pages/report-form/report-form';
import { WallPage } from '../pages/wall/wall';
import { AuthProvider } from '../providers/auth/Auth.service';

//Maps

import { AgmCoreModule } from '@agm/core';
// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { ReportsProvider } from '../providers/reports/reports';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';


// Descometar para probar en el navegador
class CameraMock extends Camera {
  getPicture(options) {
    return new Promise((resolve, reject) => {
      resolve(environment.base64);
    });
  }
}

 
import { IonicStorageModule } from '@ionic/storage';
import { UsersProvider } from '../providers/users/users';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DetailPage,
    LoginPage,
    MapPage,
    ReportFormPage,
    WallPage,
    RegisterPage
    
  ],
  imports: [
    BrowserModule,
    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googlemaps.apiKey
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DetailPage,
    LoginPage,
    MapPage,
    ReportFormPage,
    WallPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ReportsProvider,
    ImagePicker,
    //{ provide: Camera, useClass: CameraMock },
    Camera,
    //{ provide: Geolocation, useClass: GeoMock }
    Geolocation,

    Storage,
    UsersProvider
  ]
})
export class AppModule {}
