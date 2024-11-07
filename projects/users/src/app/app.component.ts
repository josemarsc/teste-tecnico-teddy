import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../../../shared/services/storage.service';
import { Session } from '../../../shared/models/session.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private storageService: StorageService) {
    const sessionStorage = this.storageService.getSession();
  }

}
