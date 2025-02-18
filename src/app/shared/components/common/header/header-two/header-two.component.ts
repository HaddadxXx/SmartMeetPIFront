import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FeatherIconComponent } from '../../feather-icon/feather-icon.component';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';
import { BrandLogoComponent } from '../widgets/brand-logo/brand-logo.component';
import { FriendRequestComponent } from '../widgets/friend-request/friend-request.component';
import { MessagesComponent } from '../widgets/messages/messages.component';
import { MobileMenuComponent } from '../widgets/mobile-menu/mobile-menu.component';
import { ModeComponent } from '../widgets/mode/mode.component';
import { NotificationComponent } from '../widgets/notification/notification.component';
import { SearchBoxComponent } from '../widgets/search-box/search-box.component';
import { UserProfileComponent } from '../widgets/user-profile/user-profile.component';

import { header } from '../../../../data/header';

@Component({
  selector: 'app-header-two',
  standalone: true,
  imports: [SvgIconComponent,SearchBoxComponent,BrandLogoComponent,FriendRequestComponent,BrandLogoComponent,
    MessagesComponent,ModeComponent,MobileMenuComponent,NotificationComponent,UserProfileComponent,
    FeatherIconComponent,RouterModule,],
  templateUrl: './header-two.component.html',
  styleUrl: './header-two.component.scss'
})

export class HeaderTwoComponent {

  public header = header;

}
