import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map, take } from 'rxjs';
import { Auth } from '../Services/auth';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  if(!authService.isLoggedIn()){
    router.navigate(['login']);
    return false;
  }

  return true;
};
