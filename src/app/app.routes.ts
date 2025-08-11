import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { Role } from './models/role';
import { EndUserComponent } from './pages/end-user/end-user';
import { CreateTripComponent } from './pages/end-user/create-trip/create-trip';
import { TripDetailComponent } from './pages/end-user/trip-detail/trip-detail';
import { AddExpenseComponent } from './pages/end-user/add-expense/add-expense';
import { ApproverComponent } from './pages/approver/approver';
import { FinanceComponent } from './pages/finance/finance';
import { ApproverTripDetailComponent } from './pages/approver/trip-detail/trip-detail';
import { FinanceTripDetailComponent } from './pages/finance/trip-detail/trip-detail';
import { LoginComponent } from './pages/login/login';
import { TripDetailViewComponent } from './components/trip-detail-view/trip-detail-view';

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
    path: 'traveller/create-trip',
    canActivate: [authGuard],
    data: { roles: [Role.EndUser] },
    component: CreateTripComponent,
  },
  {
    path: 'traveller/trip/:id',
    canActivate: [authGuard],
    data: { roles: [Role.EndUser] },
    component: TripDetailComponent,
  },
  {
    path: 'traveller/trip/:tripId/add-expense',
    canActivate: [authGuard],
    data: { roles: [Role.EndUser] },
    component: AddExpenseComponent,
  },

  {
    path: 'approver',
    canActivate: [authGuard],
    data: { roles: [Role.Approver] },
    component: ApproverComponent,
  },
  {
    path: 'approver/trip/:tripId',
    canActivate: [authGuard],
    data: { roles: [Role.Approver] },
    component: ApproverTripDetailComponent,
  },

  {
    path: 'finance',
    canActivate: [authGuard],
    data: { roles: [Role.Finance] },
    component: FinanceComponent,
  },
  {
    path: 'finance/trip/:tripId',
    canActivate: [authGuard],
    data: { roles: [Role.Finance] },
    component: FinanceTripDetailComponent,
  },
  { path: '**', redirectTo: 'login' },
];
