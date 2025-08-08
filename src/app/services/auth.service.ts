// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Role } from '../models/role';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storageKey = 'userRole';

  loginAs(role: Role) {
    localStorage.setItem(this.storageKey, role);
 }

  logout() {
    localStorage.removeItem(this.storageKey);
  }

  getRole(): Role | null {
    const v = localStorage.getItem(this.storageKey);
    return v ? (v as Role) : null;
  }

  isLoggedIn(): boolean {
    return this.getRole() !== null;
  }
}
