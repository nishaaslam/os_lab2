import { Injectable } from '@angular/core';
import { BaseService } from './api-service';
import { HttpClient } from '@angular/common/http';
import { APIPaths } from '../common/constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(http :HttpClient){
    super(http)
    }

    login(credentials:any) {
      return this.service(this.post(APIPaths.login, credentials))
    }
}
