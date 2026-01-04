import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Auth/auth.service';
import { Router } from '@angular/router';
import { CookieService } from '../../common/Services/cookie.servies';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  message: string = 'Loading...';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.authService.validateToken().subscribe({
      next: (response: any) => {
        this.message = 'Welcome! You are securely logged in.';
      },
      error: (err: any) => {
        this.authService.logout();
      },
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
