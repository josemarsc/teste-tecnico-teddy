import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { selectedUsers$ } from '../../../../shared/globals/globals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-selected-users',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './selected-users.component.html',
  styleUrls: ['./selected-users.component.scss', '../common-users/styles.scss'],
})
export class SelectedUsersComponent {

  selectedUsers = selectedUsers$;

  unselectUser(user: User) {
    selectedUsers$.next(selectedUsers$.value.filter(x => x.id !== user.id));
  }

  unselectAllUsers() {
    selectedUsers$.next([]);
  }

}
