import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SvgIconComponent } from '../../../svg-icon/svg-icon.component';
import { FeatherIconComponent } from '../../../feather-icon/feather-icon.component';

import { ClickOutSideDirective } from '../../../../../directives/click-out-side.directive';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [FeatherIconComponent,SvgIconComponent,RouterModule,ClickOutSideDirective],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})

export class NotificationComponent {

  public isOpen : boolean = false;

  outSideClose() {
    this.isOpen = false;
  }

}
