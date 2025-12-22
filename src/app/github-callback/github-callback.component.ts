import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Auth/auth.service';

@Component({
  selector: 'app-github-callback',
  template: '<p>Validating GitHub login...</p>',
})
export class GithubCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Extract the 'code' query parameter returned by GitHub
    this.route.queryParams.subscribe((params) => {
      const code = params['code'];
      if (code) {
        this.authService.validateGithubCode(code).subscribe({
          next: (res) => {
            console.log('GitHub Token:', res.accessToken);
            // Save the GitHub token or the session token as needed
            localStorage.setItem('github_token', res.accessToken);
            this.router.navigate(['/']); // Redirect to home
          },
          error: (err) => {
            console.error('GitHub Login Failed', err);
            this.router.navigate(['/login']);
          },
        });
      }
    });
  }
}
