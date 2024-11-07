import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { StorageService } from '../../../../../shared/services/storage.service';
import { logoBlackSrc, session$ } from '../../../../../shared/globals/globals';
import { ActiveRoute } from '../../../../../shared/models/types';

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  @Input() activeRoute: ActiveRoute;
  @Output() toggleMenu: EventEmitter<void> = new EventEmitter<void>();

  logoBlackSrc = logoBlackSrc;
  session$ = session$;

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
