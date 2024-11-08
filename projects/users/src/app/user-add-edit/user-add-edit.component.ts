import { Component, Inject } from '@angular/core';
import { User } from '../../model/user.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenericForm } from '../../../../shared/models/types';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { UsersService } from '../services/users.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { SnackbarService } from '../../../../shared/services/snackbar.service';

type TForm = GenericForm<Pick<User, 'name' | 'salary' | 'companyValuation'>>;

@Component({
  selector: 'user-add-edit',
  standalone: true,
  providers: [provideNgxMask()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgxMaskDirective,
  ],
  templateUrl: './user-add-edit.component.html',
  styleUrl: './user-add-edit.component.scss'
})
export class UserAddEditComponent {

  user: User;
  form: FormGroup<TForm> = new FormGroup<TForm>({
    name: new FormControl(null, [Validators.required]),
    companyValuation: new FormControl(null, [Validators.required]),
    salary: new FormControl(null, [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { user: User },
    private dialogRef: MatDialogRef<UserAddEditComponent>,
    private userService: UsersService,
    private modalService: ModalService,
    private snackbarService: SnackbarService,
  ) {
    this.user = this.data.user;
    if (this.user) this.form.patchValue(this.user);
  }

  async save() {
    const user = this.form.value;

    if (this.form.invalid) return this.modalService.presentAlert('Verifique se todos os campos estão preenchidos corretamente');

    const loading = this.modalService.presentLoading('Salvando usuário...');

    try {
      const promise = this.user ? this.userService.updateUser(this.user.id, user) : this.userService.insertUser(user);
      await promise;
      this.snackbarService.open('Usuário salvo com sucesso');
      this.dialogRef.close(true);
    } catch (error) {
      this.modalService.presentAlert('Erro ao salvar usuário');
      console.log(error);
    } finally {
      loading.close();
    }
  }

  close() {
    this.dialogRef.close();
  }

}
