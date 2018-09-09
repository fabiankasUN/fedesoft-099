import { Injectable } from '@angular/core';
import { REPORTS } from '../../data/mock-reports';
import { Report } from '../../interfaces/Report';
import { AngularFireDatabase  } from 'angularfire2/database';
import { Observable } from 'rxjs-compat';

/*
  Generated class for the ReportsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReportsProvider {
  constructor(private db: AngularFireDatabase) {
    console.log('Hello ReportsProvider Provider');
  }


  getReports(): Observable<any[]>{
    return this.db.list('Reports').valueChanges();
  }
}
