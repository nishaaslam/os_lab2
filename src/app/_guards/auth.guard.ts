import { CanActivateFn, Router } from '@angular/router';
import { TokenHelper } from '../_helpers';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
 
  const localData =  TokenHelper.getUserDetail(); 
  if(localData != null) {
    return true;
  } else {
    router.navigateByUrl('/login')
    return false;
  }
};
