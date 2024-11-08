import { CommonModule, NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    MatButtonModule,
    MatIconModule,
    NgClass
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  @Input() type: 'icon-only' | 'flat' | 'clear' | 'outline' = 'flat';
  @Input() expand: boolean = true;
  @Input() iconName: string;
  @Input() class: string;

  @Output() clicked = new EventEmitter<void>() as EventEmitter<void>;

  onClick() {
    console.log('Button clicked');
    this.clicked.emit();
  }

}
