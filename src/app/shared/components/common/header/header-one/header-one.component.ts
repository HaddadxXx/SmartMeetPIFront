import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BrandLogoComponent } from '../widgets/brand-logo/brand-logo.component';
import { FriendRequestComponent } from '../widgets/friend-request/friend-request.component';
import { FeatherIconComponent } from '../../feather-icon/feather-icon.component';
import { SearchBoxComponent } from '../widgets/search-box/search-box.component';
import { MessagesComponent } from '../widgets/messages/messages.component';
import { ModeComponent } from '../widgets/mode/mode.component';
import { MobileMenuComponent } from '../widgets/mobile-menu/mobile-menu.component';
import { NotificationComponent } from '../widgets/notification/notification.component';
import { UserProfileComponent } from '../widgets/user-profile/user-profile.component';
import { CommonService } from '../../../../services/common.service';
import { ClickOutSideDirective } from '../../../../directives/click-out-side.directive';

@Component({
  selector: 'app-header-one',
  standalone: true,
  imports: [BrandLogoComponent, RouterModule, SearchBoxComponent, FriendRequestComponent, MessagesComponent, 
    ModeComponent, MobileMenuComponent, NotificationComponent, UserProfileComponent, FeatherIconComponent,ClickOutSideDirective],
  templateUrl: './header-one.component.html',
  styleUrl: './header-one.component.scss'
})

export class HeaderOneComponent {

  public isShow: boolean = false;
  @Input() currentUrl :string;

}
