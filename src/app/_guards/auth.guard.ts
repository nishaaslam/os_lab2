import { CanActivateFn } from '@angular/router';
import { TokenHelper } from '../_helpers';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(router);
 
  const localData =  TokenHelper.getAccessToken(); 
  if(localData != null) {
    return true;
  } else {
    router.navigateByUrl('/login')
    return false;
  }
};
