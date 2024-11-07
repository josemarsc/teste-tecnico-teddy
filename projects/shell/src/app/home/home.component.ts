import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidenavComponent } from '../custom-components/sidenav/sidenav.component';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
import { ToolbarComponent } from '../custom-components/toolbar/toolbar.component';

export const mainSidenavEl: BehaviorSubject<MatDrawer> = new BehaviorSubject(null);

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

  @ViewChild(MatDrawer) drawer: MatDrawer;

  ngAfterViewInit() {
    if (this.drawer) mainSidenavEl.next(this.drawer);
  }

}
