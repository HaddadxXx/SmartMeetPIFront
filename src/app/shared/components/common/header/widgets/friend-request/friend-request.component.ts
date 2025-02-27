import { Component } from '@angular/core';

import { FeatherIconComponent } from '../../../feather-icon/feather-icon.component';

import { ClickOutSideDirective } from '../../../../../directives/click-out-side.directive';

@Component({
  selector: 'app-friend-request',
  standalone: true,
  imports: [FeatherIconComponent, ClickOutSideDirective],
  templateUrl: './friend-request.component.html',
  styleUrl: './friend-request.component.scss'
})
export class FriendRequestComponent {

  public isOpen: boolean = false;
  public friendRequest = [
    {
      url: 'assets/images/user-sm/5.jpg'
    },
    {
      url: 'assets/images/user-sm/6.jpg'
    },
    {
      url: 'assets/images/user-sm/7.jpg'
    },
    {
      url: 'assets/images/user-sm/2.jpg'
    },
  ]

  outSideClose() {
    this.isOpen = false;
  }

}
