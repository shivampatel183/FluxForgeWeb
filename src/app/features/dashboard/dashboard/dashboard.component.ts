import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SidebarComponent,
  StatsComponent,
  ProjectListComponent,
} from '../../../shared/components';
import { AuthService, ProjectService } from '../../../core/services';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    StatsComponent,
    ProjectListComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  projectService = inject(ProjectService);
  auth = inject(AuthService);
  mobileMenuOpen = false;

  ngOnInit(): void {
    this.projectService.fetchProjects();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  logout(): void {
    this.auth.logout();
  }
}
