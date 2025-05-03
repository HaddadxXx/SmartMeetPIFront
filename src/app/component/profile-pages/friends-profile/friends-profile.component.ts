import { Component } from '@angular/core';

import { AboutIntroMySelfComponent } from '../../../shared/components/common/about-intro-my-self/about-intro-my-self.component';
import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { FriendSuggestionComponent } from '../../../shared/components/common/friend-suggestion/friend-suggestion.component';
import { GalleryComponent } from '../../../shared/components/common/gallery/gallery.component';
import { LikedPagesComponent } from '../../../shared/components/common/liked-pages/liked-pages.component';
import { PostDetailsComponent } from '../../../shared/components/common/posts/post-details/post-details.component';
import { PostHeaderComponent } from '../../../shared/components/common/posts/post-header/post-header.component';
import { WorldwideTrendsComponent } from '../../../shared/components/common/worldwide-trends/worldwide-trends.component';
import { ProfileMenuComponent } from '../widgets/profile-menu/profile-menu.component';
import { ProfileContentComponent } from '../widgets/profile-pages/profile-content/profile-content.component';
import { ProfilePagesComponent } from '../widgets/profile-pages/profile-pages.component';
import { ProfileComponent } from './profile/profile.component';

import { CommonService } from '../../../shared/services/common.service';
import { ProfilePagesService } from '../../../shared/services/profile-Pages/profile-pages.service';

import { Router } from '@angular/router';
import { introMySelf } from '../../../shared/data/profile-pages/time-line';
import { profile } from '../../../shared/interface/post';
import { FriendProfileSkeletonComponent } from '../../../shared/skeleton-loader/profile-pages-skeleton/friend-profile-skeleton/friend-profile-skeleton.component';

@Component({
  selector: 'app-friends-profile',
  standalone: true,
  imports: [ProfilePagesComponent, ProfileMenuComponent, AboutIntroMySelfComponent, ProfileContentComponent,
    FriendSuggestionComponent, LikedPagesComponent, GalleryComponent, FeatherIconComponent, ProfileComponent,
    WorldwideTrendsComponent, PostHeaderComponent, PostDetailsComponent,FriendProfileSkeletonComponent],
  templateUrl: './friends-profile.component.html',
  styleUrl: './friends-profile.component.scss'
})

export class FriendsProfileComponent {

  public displayCount: number = 5;
  public introMySelf = introMySelf;
  public visiblePosts: profile[];
  public post: profile[];
  public currentUrl: string;

  constructor(public profileServices: ProfilePagesService, public commonServices: CommonService,
    private router :Router) { 
    this.currentUrl = this.router.url;
    }

  ngOnInit() {
    this.profileServices.friendProfile().subscribe((data) => {
      if (data.friendProfile) {
        this.post = data.friendProfile;
        this.visiblePosts = this.post.slice(0, this.displayCount);
        this.post.filter((element, index) => {
          index === 0 ? element.active = true : element.active = false;
        });
      }
    });
  }

  refresh() {
    this.displayCount = Math.min(this.displayCount + 1);
    this.visiblePosts = this.post.slice(0, this.displayCount);
  }

}
