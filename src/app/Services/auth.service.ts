import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7139/api/Auth';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Registration`, user, {
      responseType: 'text',
    });
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login`, user, {
      responseType: 'text',
    });
  }

  initiateGithubLogin() {
    window.location.href = `${this.apiUrl}/github`;
  }

  validateGithubCode(code: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/callback?code=${code}`);
  }
}
