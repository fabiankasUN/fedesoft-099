
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { User } from '../../interfaces/User';
import { UsersProvider } from '../users/users'

import {  EventEmitter } from '@angular/core';

// import { Observable } from 'rxjs-compat';
// import { map } from 'rxjs-compat/operators';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  public authState: any = null;

  public user = new EventEmitter<User>();
  public currentUser: User;

  constructor(private toastCtrl: ToastController,
              private firebaseAuth: AngularFireAuth,
              private db: AngularFireDatabase,private storage: Storage,
              private userProv: UsersProvider
            ){
              
              this.firebaseAuth.authState.subscribe((auth) => {
                this.authState = auth;
              });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false;
  }
  get currentUserEmail(): string {
    return this.authenticated ? this.authState.email : '';
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.socialSignIn(provider);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.socialSignIn(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.firebaseAuth.auth.signInWithPopup(provider)
      .then((credential) =>  {
          this.authState = credential.user;
          this.updateUserData(this.authState.displayName);
      })
      .catch(error => {
          this.toastCtrl.create({
          message: 'Authentication failed '  + error,
          duration: 3000,
          position: 'bottom'
        }).present();
      });
  }

  emailSignUp(email: string, password: string, name: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.updateUserData(name);
      })
      .catch(error => {
        this.toastCtrl.create({
        message: error.message,
        duration: 3000,
        position: 'bottom'
      }).present();
        console.log(error);
    });
  }

  getUser(){
    return this.db.list(`users`).valueChanges();
  }

  
  emailLogin(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.userProv.getUserKey(this.authState.user.uid).valueChanges().subscribe((data)=> {
          
          var userStorage: User = { email :email,name: data['name'] , $key: user.user.uid };
          console.log(userStorage);
          this.storage.set('user',userStorage);
          this.user.emit( userStorage );
        });
      })
      .catch(error => {
        this.toastCtrl.create({
        message: 'Authentication failed',
        duration: 3000,
        position: 'bottom'
      }).present();
    });
  }

  resetPassword(email: string) {
    const auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error));
  }

  anonymousLogin() {
    return this.firebaseAuth.auth.signInAnonymously()
    .then((user) => {
      this.authState = user;
      this.updateUserData();
    })
    .catch(error => console.log(error));
  }

  private updateUserData(name?: string): void {
    var uid = this.currentUserId == undefined ? this.authState.user.uid : this.currentUserId;
    const path = `users/${uid}`;
    const data = {
      name: this.authState.displayName != null ? this.authState.displayName : name,
      email: this.authState.email == undefined ? this.authState.user.email : this.authState.email
    };
    // Save in database
    this.db.object(path).update(data).then(() => {
      var user: User = {email :data.email,name: data.name, $key: uid };
      this.storage.set('user',user);
      this.user.emit( user );
    },
    ).catch( error => 'Authentication failed' );
  }
  
  signOut(): void {
    this.firebaseAuth.auth.signOut();
    this.storage.remove('user');
  }


}
