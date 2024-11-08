import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User, Users } from '../../model/user.model';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserAddEditComponent } from '../user-add-edit/user-add-edit.component';
import { defaultPaginatorOptions, defaultPaginatorSize, ModalService, Paginator, SnackbarService } from '@lib/common';
import { selectedUsers$ } from '../../model/variables';

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
    private modalService: ModalService,
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
    const modal = this.modalService.presentModal(UserAddEditComponent, { user });
    modal.afterClosed().subscribe({
      next: (result) => {
        if (result) this.getUsers();
      }
    });
  }

  async deleteUser(user: User) {
    const confirm = this.modalService.presentConfirm("Excluir cliente", `Deseja excluir o cliente <span class="fw-bold">${user.name}</span>?`, { confirmText: 'Excluir' });
    confirm.afterClosed().subscribe({
      next: async (result) => {
        if (!result) return;

        const loading = this.modalService.presentLoading('Excluindo cliente...');
        try {
          this.usersService.deleteUser(user.id);
          this.snackbarService.open('Cliente excluído com sucesso');
          this.getUsers();
          selectedUsers$.next(selectedUsers$.value.filter(x => x.id !== user.id));
        } catch (error) {
          console.error(error);
          this.snackbarService.open('Erro ao excluir cliente');
        } finally {
          loading.close();
        }
      }
    });
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

