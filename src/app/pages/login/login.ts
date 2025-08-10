import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { pathForRole } from '../../guards/role-path';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Check if user is already logged in and redirect to appropriate page
    if (this.auth.isLoggedIn()) {
      const userRole = this.auth.getRole();
      if (userRole) {
        this.router.navigateByUrl(pathForRole(userRole));
      }
    }
  }

  login() {
    const success = this.auth.login(this.username, this.password);

    if (success) {
      this.router.navigateByUrl(pathForRole(this.auth.getRole()!));
    } else {
      this.errorMsg = 'Invalid username or password';
    }
  }
}
