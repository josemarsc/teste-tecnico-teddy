import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { StorageService } from '../../../../../shared/services/storage.service';
import { logoBlackSrc, session$ } from '../../../../../shared/globals/globals';

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    AsyncPipe,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  @Output() toggleMenu: EventEmitter<void> = new EventEmitter<void>();

  logoBlackSrc = logoBlackSrc;
  session$ = session$;

  constructor(
    private storageService: StorageService,
    private router: Router,
  ) { }

  logout() {
    this.storageService.removeSession();
    this.router.navigate(['/login'], { replaceUrl: true });
    session$.next(null);
  }

}
