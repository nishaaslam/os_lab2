import { Injectable } from '@angular/core';
import { BaseService } from './api-service';
import { HttpClient } from '@angular/common/http';
import { APIPaths } from '../common/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private http: HttpClient) {
  }


  //Dashboard
  getDashboardDetail():Observable<any>  {
    return this.http.get<any>(APIPaths.history)
  }

  //history
  getHistory():Observable<any> {
    return this.http.get<any>(APIPaths.history)
  }

  //change password
  changePassword(model: any) : Observable<any>{
    return this.http.post<any>(APIPaths.changePassword, model)
  }

  //registerCustomer
  registerCustomer(model:any) :Observable<any>{
    return this.http.post<any>(APIPaths.registerCustomer, model)
  }

   //Meter Detail
   addMeter(model: any) : Observable<any>{
    return this.http.post<any>(APIPaths.addMeter, model)
   }
}
