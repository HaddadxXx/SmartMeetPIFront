import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-wrap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-wrap.component.html',
  styleUrl: './user-wrap.component.scss'
})

export class UserWrapComponent {

  @Input() user: string;
  @Input() currentUrl: string;

}
