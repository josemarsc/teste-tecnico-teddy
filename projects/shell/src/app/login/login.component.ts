import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent, GenericForm, InputComponent, Login, logoBlackSrc, Session, SnackbarService, StorageService } from '@lib/common';
import { session$ } from '../model/variables';

type TForm = GenericForm<Login>;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
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
