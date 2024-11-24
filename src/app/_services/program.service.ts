import { Injectable } from '@angular/core';
import { BaseService } from './api-service';
import { HttpClient } from '@angular/common/http';
import { APIPaths } from '../common/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramService extends BaseService {

  constructor(private http: HttpClient) {
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
  changePassword(model: any) : Observable<any>{
    return this.http.post<any>(APIPaths.changePassword, model)
  }

  //registerCustomer
  registerCustomer(model:any){
    return this.http.post<any>(APIPaths.registerCustomer, model)
  }

   //Meter Detail
   addMeter(model: any){
    return this.service(this.post(APIPaths.addMeter, model))
   }
}
