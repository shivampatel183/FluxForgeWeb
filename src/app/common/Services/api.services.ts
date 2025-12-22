import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://localhost:7139/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  get(endpoint: string): Observable<any> {
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  post(endpoint: string, data: any): Observable<any> {
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.post(url, data, {
      headers: this.getHeaders(),
      responseType: 'text' as 'json',
    });
  }

  put(endpoint: string, data: any): Observable<any> {
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.put(url, data, { headers: this.getHeaders() });
  }

  delete(endpoint: string): Observable<any> {
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }
}
