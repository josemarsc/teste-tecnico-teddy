import { Component, Inject } from '@angular/core';
import { User } from '../../model/user.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-user-add-edit',
  standalone: true,
  imports: [],
  templateUrl: './user-add-edit.component.html',
  styleUrl: './user-add-edit.component.scss'
})
export class UserAddEditComponent {

  user: User;


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { user: User },
    private dialogRef: MatDialogRef<UserAddEditComponent>,
  ) {
    console.log(this.data)
    this.user = this.data.user;
  }

  close() {
    this.dialogRef.close();
  }

}
