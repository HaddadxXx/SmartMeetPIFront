import { Component } from '@angular/core';
import { FeatherIconComponent } from '../../../feather-icon/feather-icon.component';
import { RouterModule } from '@angular/router';
import { ClickOutSideDirective } from '../../../../../directives/click-out-side.directive';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [FeatherIconComponent, RouterModule,ClickOutSideDirective],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})

export class MessagesComponent {

  public isOpen: boolean = false;

  outSideClose() {
    this.isOpen = false;
  }

}
