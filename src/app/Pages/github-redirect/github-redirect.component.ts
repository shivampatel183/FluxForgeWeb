import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from '../../common/Services/cookie.servies';

@Component({
  selector: 'app-github-redirect',
  imports: [],
  templateUrl: './github-redirect.component.html',
  styleUrl: './github-redirect.component.css',
})
export class GithubRedirectComponent {
  constructor(private router: Router, private cookieService: CookieService) {}

  ngOnInit(): void {
    const token = this.cookieService.getCookie('FluxForgeJwt');

    if (token) {
      localStorage.setItem('token', token);
      this.router.navigate(['/dashboard']);
    } else {
      console.error('Login failed: Token cookie not found.');
      this.router.navigate(['/login']);
    }
  }
}
