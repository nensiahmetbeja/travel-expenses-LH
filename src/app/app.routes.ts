import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { Role } from './models/role';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.LoginComponent)
  },

  { path: 'end-user',
    canActivate: [authGuard],
    data: { roles: [Role.EndUser] },
    loadComponent: () =>
      import('./pages/end-user/end-user').then(m => m.EndUserComponent)
  },

  { path: 'approver',
    canActivate: [authGuard],
    data: { roles: [Role.Approver] },
    loadComponent: () =>
      import('./pages/approver/approver').then(m => m.ApproverComponent)
  },

  { path: 'finance',
    canActivate: [authGuard],
    data: { roles: [Role.Finance] },
    loadComponent: () =>
      import('./pages/finance/finance').then(m => m.FinanceComponent)
  },
  { path: '**', redirectTo: 'login' },

];
