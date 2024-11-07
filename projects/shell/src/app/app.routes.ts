import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    children: [
      { path: 'users', loadChildren: () => import('users/routes').then(m => m.routes) },
      { path: 'products', loadChildren: () => import('products/routes').then(m => m.routes) },
    ]
  },
];
