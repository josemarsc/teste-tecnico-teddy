import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { sessionGuard } from '../../../shared/guards/session.guard';

export const routes: Routes = [
  { path: '', canActivate: [sessionGuard], component: HomeComponent, pathMatch: 'full' },
];
