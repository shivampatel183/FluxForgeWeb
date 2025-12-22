import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastService } from '../../common/Services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
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
      next: (response: string) => {
        if (
          response === 'Invalid Credentials' ||
          response === 'User Not Found' ||
          response === 'Invalid Request'
        ) {
          this.toast.error(response);
        } else {
          this.toast.success('Login Successful! Redirecting...');
          localStorage.setItem('token', response);
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
