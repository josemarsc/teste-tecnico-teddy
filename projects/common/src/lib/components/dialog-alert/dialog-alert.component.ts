import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-dialog-alert',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatIconModule,
    ButtonComponent,
  ],
  templateUrl: './dialog-alert.component.html',
  styleUrl: './dialog-alert.component.scss'
})
export class DialogAlertComponent {

  title: string;
  message: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { title: string, message: string },
    private dialogRef: MatDialogRef<DialogAlertComponent>,
  ) {
    this.title = this.data.title;
    this.message = this.data.message;
  }

  close() {
    this.dialogRef.close();
  }
}
