import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { FriendsTitleComponent } from '../widgets/about-friend-list/friends-title/friends-title.component';
import { ProfileMenuComponent } from '../widgets/profile-menu/profile-menu.component';
import { ProfilePagesComponent } from '../widgets/profile-pages/profile-pages.component';

import { CommonService } from '../../../shared/services/common.service';

import { friends } from '../../../shared/data/profile-pages/about';
import { ProfileFriendsSkeletonComponent } from '../../../shared/skeleton-loader/profile-pages-skeleton/profile-friends-skeleton/profile-friends-skeleton.component';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [ProfilePagesComponent, ProfileMenuComponent, FriendsTitleComponent,
    ProfileFriendsSkeletonComponent,RouterModule, CommonModule],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})

export class FriendsComponent {

  public isShow: boolean = false;
  public friends = friends;
  @Input() currentUrl: string;

  constructor(public commonServices:CommonService,
    private router :Router) {
    this.currentUrl = this.router.url;

    }
}
