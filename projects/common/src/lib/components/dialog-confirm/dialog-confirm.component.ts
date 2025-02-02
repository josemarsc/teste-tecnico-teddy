import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-dialog-confirm',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    ButtonComponent,
  ],
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.scss'
})
export class DialogConfirmComponent {

  title: string;
  message: string;
  confirmText: string = 'Confirmar';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Record<string, string | number | Object>,
    private dialogRef: MatDialogRef<DialogConfirmComponent>,
  ) {
    const { title, message, confirmText } = data;

    this.title = title as string;
    this.message = message as string;
    if (confirmText) this.confirmText = confirmText as string
  }

  confirm() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close();
  }

}
