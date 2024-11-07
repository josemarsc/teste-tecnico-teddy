import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', loadComponent: () => import('./users/users.component').then(m => m.UsersComponent) },
  { path: 'selected', loadComponent: () => import('./selected-users/selected-users.component').then(m => m.SelectedUsersComponent) },
];
