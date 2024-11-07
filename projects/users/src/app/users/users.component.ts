import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User, Users } from '../../model/user.model';
import { defaultPaginatorOptions, defaultPaginatorSize, selectedUsers$, session$ } from '../../../../shared/globals/globals';
import { Paginator } from '../../../../shared/models/types';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { UserAddEditComponent } from '../user-add-edit/user-add-edit.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss', '../common-users/styles.scss']
})
export class UsersComponent {

  users: Users;
  loading: boolean = false;
  session = session$;

  paginatorConfig: Paginator = {
    page: 1,
    limit: 10,
  };
  defaultPaginatorSize = defaultPaginatorSize;
  defaultPaginatorOptions = defaultPaginatorOptions;

  idsSelectedUsers: Array<string> = [];

  constructor(
    private usersService: UsersService,
    private snackbarService: SnackbarService,
    private matDialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  ngAfterViewInit() {
    selectedUsers$.subscribe({
      next: (users) => this.idsSelectedUsers = users?.map(x => x.id)
    });
  }

  async getUsers() {
    try {
      this.loading = true;
      const res = await this.usersService.getUsers(this.paginatorConfig);
      const { clients, currentPage, totalPages } = res;
      this.users = clients;
      this.paginatorConfig = {
        ...this.paginatorConfig,
        page: currentPage,
        totalPages,
      };
    } catch (error) {
      console.error(error);
      this.snackbarService.open('Erro ao buscar usuários');
    } finally {
      this.loading = false;
    }
  }

  selectUser(user: User) {
    if (selectedUsers$.value?.find(x => x.id === user.id)) return this.snackbarService.open('Usuário já selecionado');

    selectedUsers$.next([selectedUsers$.value, user].flat().filter(x => x));
  }

  addEditUser(user: User = null) {
    // this.matDialog.open(UserAddEditComponent, { data: { user } });
  }

  deleteUser(user: User) {

  }

  handlePaginatorEvent(event: PageEvent) {
    this.paginatorConfig = {
      ...this.paginatorConfig,
      page: event.pageIndex + 1,
      limit: event.pageSize,
    };

    this.getUsers();
  }

}

