import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenericForm, Login } from '../../../../shared/models/types';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { Session } from '../../../../shared/models/session.model';
import { Router } from '@angular/router';
import { StorageService } from '../../../../shared/services/storage.service';
import { logoBlackSrc, session$ } from '../../../../shared/globals/globals';

type TForm = GenericForm<Login>;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  logoBlackSrc = logoBlackSrc;

  form: FormGroup<TForm> = new FormGroup<TForm>({
    nome: new FormControl(null, [Validators.required]),
  });

  constructor(
    private matSnackbarService: SnackbarService,
    private router: Router,
    private storageService: StorageService,
  ) {}

  login() {
    if (this.form.controls.nome.invalid) return this.matSnackbarService.open('Nome é obrigatório');

    const session: Session = {
      nome: this.form.controls.nome.value,
      timestamp: Date.now(),
    };

    this.storageService.setSession(session);
    session$.next(session);

    this.router.navigate(['/home'], { replaceUrl: true });
  }

}
