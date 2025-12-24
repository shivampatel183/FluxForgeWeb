import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastService } from '../../common/Services/toast.service';
import { ApiResponse } from '../../common/components/model/authmodel';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    email: '',
    passwordHash: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}

  onLogin() {
    this.authService.login(this.loginData).subscribe({
      next: (response: ApiResponse<string>) => {
        if (!response.success) {
          this.toast.error(response.error || 'Login failed');
          return;
        } else {
          this.toast.success('Login Successful! Redirecting...');
          localStorage.setItem('token', response.data);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err: any) => {
        this.toast.error('Server error. Please try again later.');
      },
    });
  }

  connectGithub() {
    this.authService.initiateGithubLogin();
  }
}
