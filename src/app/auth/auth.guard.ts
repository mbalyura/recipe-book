import { CanActivateFn, Router } from '@angular/router';
// import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.user.pipe(
    take(1),
    map((user) => {
      return user ? true : router.createUrlTree(['/auth']);
    })
  );
};
