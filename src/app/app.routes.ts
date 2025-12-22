import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/signin/signin.component';
import { GithubCallbackComponent } from './github-callback/github-callback.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'github-callback', component: GithubCallbackComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
