import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'projects/shared-lib/src/lib/authentic/service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem('authToken');
  console.log('Guard - token:', token); // <-- Aqui

  const isLogged = !!token;

  if (isLogged) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
