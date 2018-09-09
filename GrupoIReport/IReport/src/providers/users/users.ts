
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { User } from '../../interfaces/User'
/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {

  userList: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase) {
  }

  getUsers() {
    return this.userList = this.firebase.list('users');
  }

  insertUser(user: User) {
    this.userList.push({
      name: user.name,
      email: user.email
    });
  }
  getUser(email: string) {
    return this.firebase.list('users', q => q.orderByChild('email').equalTo(email));
  }

  getUserKey( key: string){
    return this.firebase.object('/users/' + key);
  }
  updateUser(user: User) {
    this.userList.update(user.$key, {
      name: user.name,
      email: user.email
    });
  }

  deleteUser($key: string) {
    this.userList.remove($key);
  }


}
