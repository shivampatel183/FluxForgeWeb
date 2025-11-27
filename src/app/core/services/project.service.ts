import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../interfaces';
import { AuthService } from './auth.service';
import { API_CONFIG } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  projects = signal<Project[]>([]);
  isLoading = signal(false);

  fetchProjects(): void {
    this.isLoading.set(true);

    this.http
      .get<Project[]>(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROJECTS}`,
        {
          headers: this.auth.getHeaders(),
        }
      )
      .subscribe({
        next: (data) => {
          this.projects.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Failed to load projects', err);
          // Mock Data Fallback
          this.projects.set(this.getMockProjects());
          this.isLoading.set(false);
        },
      });
  }

  private getMockProjects(): Project[] {
    return [
      {
        id: '1',
        repoFullName: 'shivampatel183/fluxforge',
        defaultBranch: 'main',
        createdAt: new Date().toISOString(),
        status: 'active',
        lastRun: '2 mins ago',
      },
      {
        id: '2',
        repoFullName: 'shivampatel183/nextjs-starter',
        defaultBranch: 'dev',
        createdAt: new Date().toISOString(),
        status: 'failed',
        lastRun: '1 hour ago',
      },
      {
        id: '3',
        repoFullName: 'shivampatel183/dotnet-api',
        defaultBranch: 'main',
        createdAt: new Date().toISOString(),
        status: 'building',
        lastRun: 'Just now',
      },
    ];
  }
}
