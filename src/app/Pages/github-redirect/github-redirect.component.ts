import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-github-redirect',
  imports: [],
  templateUrl: './github-redirect.component.html',
  styleUrl: './github-redirect.component.css',
})
export class GithubRedirectComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = this.getCookie('FluxForgeJwt');
    const GithubToken = this.getCookie('GitHubToken');

    if (token && GithubToken) {
      localStorage.setItem('token', token);
      localStorage.setItem('githubToken', GithubToken);
      this.router.navigate(['/dashboard']);
    } else {
      console.error('Login failed: Token cookie not found.');
      this.router.navigate(['/login']);
    }
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)')
    );
    if (match) return match[2];
    return null;
  }
}
