import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIPaths } from '../common/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http :HttpClient){
  }

    login(credentials:any):Observable<any> {
      return this.http.post<any>(APIPaths.login,credentials);
    }
}
