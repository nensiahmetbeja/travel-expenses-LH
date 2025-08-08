import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/role';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  const allowed = (route.data?.['roles'] ?? []) as Role[];
  const role = auth.getRole();

  if (!role || (allowed.length && !allowed.includes(role))) {
    console.log(role, " ", allowed, " failing routing")
    router.navigate(['/login']);
    return false;
  }
  return true;
};
