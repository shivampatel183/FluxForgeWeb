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
    const userName = this.cookieService.getCookie('UserName');
    const UserEmail = this.cookieService.getCookie('UserEmail');
    const avatarUrl = this.cookieService.getCookie('UserAvatar');

    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('UserName', userName || '');
      localStorage.setItem('UserEmail', UserEmail || '');
      localStorage.setItem('AvatarUrl', avatarUrl || '');
      this.router.navigate(['/dashboard']);
    } else {
      console.error('Login failed: Token cookie not found.');
      this.router.navigate(['/login']);
    }
    this.cookieService.deleteCookie('FluxForgeJwt');
  }
}
