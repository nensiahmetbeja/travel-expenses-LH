import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { Role } from './models/role';
import { EndUserComponent } from './pages/end-user/end-user';
import { ApproverComponent } from './pages/approver/approver';
import { FinanceComponent } from './pages/finance/finance';
import { LoginComponent } from './pages/login/login';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  {
    path: 'login',
    component:LoginComponent,
   
  },
  
  {
    path: 'traveller',
    canActivate: [authGuard],
    data: { roles: [Role.EndUser] },
    component: EndUserComponent,
  },

  {
    path: 'approver',
    canActivate: [authGuard],
    data: { roles: [Role.Approver] },
    component: ApproverComponent,
  },

  {
    path: 'finance',
    canActivate: [authGuard],
    data: { roles: [Role.Finance] },
    component: FinanceComponent,
  },
  { path: '**', redirectTo: 'login' },
];
