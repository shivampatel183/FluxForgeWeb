import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { AuthService } from './core/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoginComponent, DashboardComponent],
  template: `
    @if (auth.token()) {
    <app-dashboard />
    } @else {
    <app-login />
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  auth = inject(AuthService);

  ngOnInit(): void {
    // Check if there's a token in the URL params (from OAuth callback)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      this.auth.login(token);
    }
  }
}
