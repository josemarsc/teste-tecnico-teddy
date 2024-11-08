import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lib-input',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {

  @Input({ required: true }) placeholder: string;
  @Input({ required: true }) type: 'text' | 'currency';
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() controlName: string;
  @Input() formGroup: FormGroup;


}
