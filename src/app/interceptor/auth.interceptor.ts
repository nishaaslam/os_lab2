import { HttpEvent, HttpInterceptorFn, HttpInterceptor,
  HttpRequest,
  HttpHandlerFn, } from '@angular/common/http';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { TokenHelper } from '../_helpers';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { showErrorAlert } from '../common/alerts';


let router:Router;
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  let token = TokenHelper.getAccessToken();
  let authReq = token ? req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
  }) : req;

  return next(authReq).pipe(
    catchError(err => handleError(err))
);
};


function handleError(err: any): Observable<never> {
  console.error('Interceptor error:', err);

  if (err.status === 401) {
    TokenHelper.removeAccessToken();
    router.navigate(['/login'], { skipLocationChange: true });
    return EMPTY;
  }

  if (err.status === 0 || err.status === 502) {
    //showErrorAlert('Something went wrong'); 
    return EMPTY;
  }

  return throwError(() => new Error(err));

}




