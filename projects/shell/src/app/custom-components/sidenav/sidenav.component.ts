import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppPage, logoWhiteSrc } from '@lib/common';

@Component({
  selector: 'sidenav',
  standalone: true,
  imports: [
    RouterLinkActive,
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
    { label: 'Home', path: null, icon: 'home' },
    { label: 'Clientes', path: 'users', icon: 'people' },
    { label: 'Produtos', path: 'products', icon: 'grid_view' },
  ]

}
