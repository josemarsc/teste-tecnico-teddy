import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { session$ } from '../globals/globals';

export const sessionGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);

  const sessionStorage = storageService.getSession();
  if (!sessionStorage ) {
    return false;
  }

  session$.next(sessionStorage);
  return true;
};
