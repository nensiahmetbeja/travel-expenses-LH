import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../models/role';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    const success = this.auth.login(this.username, this.password);

    if (success) {
      const role = this.auth.getRole();
      const target =
        role === Role.EndUser ? '/end-user' :
        role === Role.Approver ? '/approver' : '/finance';
        console.log("successful, role: ", role, " target: ", target )
        this.router.navigateByUrl(target); 
      } else {
      this.errorMsg = 'Invalid username or password';
    }
  }
}
