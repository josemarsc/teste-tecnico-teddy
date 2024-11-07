import { Component } from '@angular/core';
import { logoWhiteSrc } from '../../../../../shared/globals/globals';
import { RouterLink } from '@angular/router';
import { AppPage } from '../../../../../shared/models/types';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'sidenav',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  logoWhiteSrc = logoWhiteSrc;

  pages: Array<AppPage> = [
    { label: 'Home', path: 'home', icon: 'home' },
    { label: 'Clientes', path: 'users', icon: 'people' },
    { label: 'Produtos', path: 'products', icon: 'grid_view' },
  ]

}
