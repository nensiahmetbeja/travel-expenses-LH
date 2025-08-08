import { Injectable } from '@angular/core';
import { Role } from '../models/role';
import { USERS } from '../data/users';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storageKey = 'userRole';

  login(username: string, password: string): boolean {
    const found = USERS.find(
      u => u.username === username && u.password === password
    );

    if (found) {
      localStorage.setItem(this.storageKey, found.role);
      return true;
    }
    return false;
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
