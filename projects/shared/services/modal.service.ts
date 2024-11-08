import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../components/dialog-confirm/dialog-confirm.component';
import { DialogAlertComponent } from '../components/dialog-alert/dialog-alert.component';
import { DialogLoadingComponent } from '../components/dialog-loading/dialog-loading.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private matDialog: MatDialog) {}

  presentModal(component: any, data: Record<string, string | number | Object> = {}) {
    return this.matDialog.open(component, { data });
  }

  presentLoading(message: string = 'Carregando...') {
    return this.matDialog.open(DialogLoadingComponent, { data: { message }, backdropClass: 'blur', disableClose: true });
  }


  presentAlert(message: string, title: string = 'Atenção') {
    return this.matDialog.open(DialogAlertComponent, { data: { title, message } });
  }

  presentConfirm(title: string, message: string, extras: Record<string, string | number | Object> = {}) {
    return this.matDialog.open(DialogConfirmComponent, { data: { title, message, ...extras } });
  }
}
