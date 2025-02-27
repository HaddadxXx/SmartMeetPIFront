import { Component } from '@angular/core';
import { friendList, friendsList } from '../../../../shared/data/profile-pages/about';
import { CommonModule } from '@angular/common';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';
import { FriendsTitleComponent } from './friends-title/friends-title.component';
import { RouterModule } from '@angular/router';
import { ClickOutSideDirective } from '../../../../shared/directives/click-out-side.directive';

@Component({
  selector: 'app-about-friend-list',
  standalone: true,
  imports: [FriendsTitleComponent, FeatherIconComponent,CommonModule,RouterModule,ClickOutSideDirective],
  templateUrl: './about-friend-list.component.html',
  styleUrl: './about-friend-list.component.scss'
})

export class AboutFriendListComponent {

  public friendList = friendList;
  public isOpen: boolean = false;

  open(value: friendsList) {
    this.friendList.forEach(i => {
      i.data.forEach(ele => {
        if (ele === value) {
          ele.isOpen = true;
        } else {
          ele.isOpen = false;
        }
      });
    })
  }
}

