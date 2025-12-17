import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { SigninComponent } from './Auth/signin/signin.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
];
