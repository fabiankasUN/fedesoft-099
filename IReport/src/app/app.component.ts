import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { WallPage } from '../pages/wall/wall';

import { AuthProvider } from '../providers/auth/Auth.service';
import { Storage } from '@ionic/storage';

import { User } from '../models/user/user';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  user: User;

  name?: string;
  email?: string;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen
            ,private auth: AuthProvider, public storage:Storage) {
    this.initializeApp();
    
    auth.user.subscribe((data) => {
      console.log('data ' + data.email);
      //this.name = data.name;
      //this.user.name = data.name;
      //this.user = data;
      this.name = data.name;
      this.email = data.email;

    });


    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Mapa', component: MapPage },
      { title: 'Muro', component: WallPage },
      { title: 'Acerca',component: ListPage },
      { title: 'Login', component: LoginPage }
    ];
    

  }

  logout(){
    console.log('saliendo...');
    this.auth.signOut();
    this.nav.setRoot(LoginPage);
    //this.nav.hide();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
