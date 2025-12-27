import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../common/Services/api.services';
import { ApiResponse } from '../common/components/model/authmodel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: ApiService, private router: Router) {}

  register(user: any): Observable<ApiResponse<string>> {
    return this.api.post('/Auth/Registration', user);
  }

  login(user: any): Observable<ApiResponse<string>> {
    return this.api.post<ApiResponse<string>>('/Auth/Login', user);
  }

  validateToken(): Observable<any> {
    return this.api.post('/Auth/validateToken', {});
  }

  validateGithubCode(code: string): Observable<any> {
    return this.api.get(`/Auth/callback?code=${code}`);
  }

  initiateGithubLogin() {
    window.location.href = 'https://localhost:7139/api/GithubAuth/github';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('github_token');
    this.router.navigate(['/login']);
  }
}
