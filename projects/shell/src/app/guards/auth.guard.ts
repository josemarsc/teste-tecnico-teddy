import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '@lib/common';
import { session$, SESSION_TIMEOUT } from '../model/variables';

export const authGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  const sessionStorage = storageService.getSession();

  if (!sessionStorage || sessionStorage.timestamp + SESSION_TIMEOUT < Date.now()) {
    router.navigate(['/login'], { replaceUrl: true });
    return false;
  }

  session$.next(sessionStorage);

  return true;
};
