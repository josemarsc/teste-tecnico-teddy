import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard],
    children: [
      { path: 'users', loadChildren: () => import('users/routes').then(m => m.routes) },
      { path: 'products', loadChildren: () => import('products/routes').then(m => m.routes) },
    ]
  },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) }
];
