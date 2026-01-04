import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/signin/signin.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { GithubRedirectComponent } from './Pages/github-redirect/github-redirect.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'github-redirect', component: GithubRedirectComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
