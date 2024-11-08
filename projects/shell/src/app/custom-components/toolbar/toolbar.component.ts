import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { session$ } from '../../model/variables';
import { ActiveRoute, ButtonComponent, logoBlackSrc, mobileBreakpoint, StorageService } from '@lib/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    AsyncPipe,
    ButtonComponent,
    MatButtonModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  @Input() activeRoute: ActiveRoute;
  @Output() toggleMenu: EventEmitter<void> = new EventEmitter<void>();

  logoBlackSrc = logoBlackSrc;
  session$ = session$;

  isWeb: boolean = window.innerWidth > mobileBreakpoint;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isWeb = event.target?.['innerWidth'] > mobileBreakpoint
  }

  constructor(
    private storageService: StorageService,
    private router: Router,
  ) {}

  logout() {
    this.storageService.removeSession();
    this.router.navigate(['/login'], { replaceUrl: true });
    session$.next(null);
  }

}
