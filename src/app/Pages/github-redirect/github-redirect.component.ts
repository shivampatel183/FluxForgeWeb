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
    const GithubToken = this.cookieService.getCookie('GitHubToken');
    const UserName = this.cookieService.getCookie('UserName');
    const userEmail = this.cookieService.getCookie('userEmail');

    if (token && GithubToken && UserName && userEmail) {
      localStorage.setItem('token', token);
      localStorage.setItem('githubToken', GithubToken);
      localStorage.setItem('UserName', UserName);
      localStorage.setItem('userEmail', userEmail);
      this.router.navigate(['/dashboard']);
    } else {
      console.error('Login failed: Token cookie not found.');
      this.router.navigate(['/login']);
    }
  }
}
