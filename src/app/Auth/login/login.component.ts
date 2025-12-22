import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    email: '',
    passwordHash: '', // Used as the password field
  };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.loginData).subscribe({
      next: (token) => {
        console.log('Login successful, Token:', token);
        localStorage.setItem('token', token); // Store JWT
        // this.router.navigate(['/dashboard']);
      },
      error: (err) => alert('Login failed: ' + err.error),
    });
  }

  connectGithub() {
    this.authService.initiateGithubLogin();
  }
}
