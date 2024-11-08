import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dialog-loading',
  standalone: true,
  imports: [
    MatDialogContent,
    MatProgressSpinner,
  ],
  templateUrl: './dialog-loading.component.html',
  styleUrl: './dialog-loading.component.scss'
})
export class DialogLoadingComponent {

  message: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { message: string },
  ) {
    this.message = this.data.message;
  }

}
