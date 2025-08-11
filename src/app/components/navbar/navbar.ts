import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../models/role';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent {
  isMenuOpen = false;

  constructor(private auth: AuthService, private router: Router) {}

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  get userRole(): Role | null {
    return this.auth.getRole();
  }

  redirectToHomepage(): void {
    const role = this.userRole;
    if (role) {
      switch (role) {
        case Role.EndUser:
          this.router.navigate(['/traveller']);
          break;
        case Role.Approver:
          this.router.navigate(['/approver']);
          break;
        case Role.Finance:
          this.router.navigate(['/finance']);
          break;
        default:
          this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleMenu(): void {
    console.log("Toggling menu, current state:", this.isMenuOpen);
    this.isMenuOpen = !this.isMenuOpen;
    console.log("New menu state:", this.isMenuOpen);
  }

  closeMenuIfOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.hamburger') && !target.closest('.mobile-menu')) {
      this.isMenuOpen = false;
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
    this.isMenuOpen = false; // Close menu after logout
  }
}