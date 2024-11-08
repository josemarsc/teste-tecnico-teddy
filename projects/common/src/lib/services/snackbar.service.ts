import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private matSnackbar: MatSnackBar) {}

  open(message: string, action: string = 'Ok', duration: number = 3000) {
    this.matSnackbar.open(message, action, { duration, verticalPosition: 'bottom', horizontalPosition: 'end' });
  }
}
