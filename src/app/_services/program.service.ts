import { Injectable } from '@angular/core';
import { BaseService } from './api-service';
import { HttpClient } from '@angular/common/http';
import { APIPaths } from '../common/constant';

@Injectable({
  providedIn: 'root'
})
export class ProgramService extends BaseService {

  constructor(http: HttpClient) {
    super(http)
  }


  //Dashboard
  getDashboardDetail() {
    return this.service(this.get(APIPaths.dashboard))
  }

  //history
  getHistory() {
    return this.service(this.get(APIPaths.history))
  }

  //change password
  changePassword(model: any){
    return this.service(this.post(APIPaths.changePassword, model))
   }

   //Meter Detail
   addMeter(model: any){
    return this.service(this.post(APIPaths.addMeter, model))
   }
}
