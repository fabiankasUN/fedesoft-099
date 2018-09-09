import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { REPORTS } from '../../data/mock-reports';
import { Report } from '../../interfaces/Report';

/*
  Generated class for the ReportsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReportsProvider {

  constructor() {
    console.log('Hello ReportsProvider Provider');
  }


  getReports() : Report[]{
    console.log("getReports");
    return REPORTS;
  }
}
