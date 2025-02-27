import { Component, Input } from '@angular/core';
import { CommonService } from '../../../../services/common.service';
import { FeatherIconComponent } from "../../feather-icon/feather-icon.component";
import { BrandLogoComponent } from "../widgets/brand-logo/brand-logo.component";
import { SearchBoxComponent } from "../widgets/search-box/search-box.component";
import { FriendRequestComponent } from "../widgets/friend-request/friend-request.component";
import { MessagesComponent } from "../widgets/messages/messages.component";
import { ModeComponent } from "../widgets/mode/mode.component";
import { NotificationComponent } from "../widgets/notification/notification.component";
import { UserProfileComponent } from "../widgets/user-profile/user-profile.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-header-three',
    standalone: true,
    templateUrl: './header-three.component.html',
    styleUrl: './header-three.component.scss',
    imports: [FeatherIconComponent, BrandLogoComponent, SearchBoxComponent, 
      FriendRequestComponent, MessagesComponent, ModeComponent, 
      NotificationComponent, UserProfileComponent,RouterModule]
})

export class HeaderThreeComponent {

  public isShow: boolean = false;
  @Input() currentUrl :string;

  constructor(public commonServices:CommonService){ }

}
