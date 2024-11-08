import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { SidenavComponent } from '../custom-components/sidenav/sidenav.component';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { ToolbarComponent } from '../custom-components/toolbar/toolbar.component';
import { ActiveRoute } from '../../../../shared/models/types';
import { mobileBreakpoint } from '../../../../shared/globals/globals';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    ToolbarComponent,
    SidenavComponent,
    MatDrawerContainer,
    MatDrawer,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  activeRoute: ActiveRoute;
  isWeb: boolean = window.innerWidth > mobileBreakpoint;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isWeb = event.target?.['innerWidth'] > mobileBreakpoint
  }

  constructor(private router: Router) {
    this.router.events.subscribe({
      next: (res) => {
        if (res instanceof NavigationEnd) {
          const split = res.url.split('/');
          this.activeRoute = split[2] as ActiveRoute;
        }
      }
    })
  }

}
