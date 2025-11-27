import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces';
import { API_CONFIG, STORAGE_KEYS } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  currentUser = signal<User | null>(null);
  token = signal<string | null>(localStorage.getItem(STORAGE_KEYS.TOKEN));

  constructor() {
    if (this.token()) {
      this.fetchProfile();
    }
  }

  login(token: string): void {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    this.token.set(token);
    this.fetchProfile();
    window.history.replaceState({}, document.title, '/');
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    this.token.set(null);
    this.currentUser.set(null);
  }

  private fetchProfile(): void {
    // Mock profile fetch - replace with actual HTTP call when backend is ready
    this.currentUser.set({
      id: 'user-guid',
      displayName: 'Shivam Patel',
      email: 'shivam@example.com',
      githubId: '12345',
    });
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token()}`,
    });
  }

  isAuthenticated(): boolean {
    return !!this.token();
  }
}
