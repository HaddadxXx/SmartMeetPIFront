import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { BirthdaySectionComponent } from '../../../shared/components/common/birthday-section/birthday-section.component';
import { CommonWeatherComponent } from '../../../shared/components/common/common-weather/common-weather.component';
import { CreatePostComponent } from '../../../shared/components/common/create-post/create-post.component';
import { EventsComponent } from '../../../shared/components/common/events/events.component';
import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { FriendSuggestionComponent } from '../../../shared/components/common/friend-suggestion/friend-suggestion.component';
import { GalleryComponent } from '../../../shared/components/common/gallery/gallery.component';
import { LikedPagesComponent } from '../../../shared/components/common/liked-pages/liked-pages.component';
import { DetailBoxComponent } from '../../../shared/components/common/posts/detail-box/detail-box.component';
import { LikePanelComponent } from '../../../shared/components/common/posts/like-panel/like-panel.component';
import { PostDetailsComponent } from '../../../shared/components/common/posts/post-details/post-details.component';
import { PostHeaderComponent } from '../../../shared/components/common/posts/post-header/post-header.component';
import { PostReactComponent } from '../../../shared/components/common/posts/post-react/post-react.component';
import { ProfileBoxComponent } from '../../../shared/components/common/profile-box/profile-box.component';
import { StroyComponent } from '../../../shared/components/common/stroy/stroy.component';
import { YourGamesComponent } from '../../../shared/components/common/your-games/your-games.component';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { SkeletonStyle1Component } from '../../../shared/skeleton-loader/news-feed-layout-skeleton/skeleton-style-1/skeleton-style-1.component';
import { AddFriendCarouselComponent } from './add-friend-carousel/add-friend-carousel.component';

import { PostService } from '../../../shared/services/news-feed-layout/post.service';

import { event } from '../../../shared/data/common';
import { profile } from '../../../shared/interface/post';
import { CommonService } from '../../../shared/services/common.service';

@Component({
  selector: 'app-style-1',
  standalone: true,
  imports: [StroyComponent, SidebarComponent, ProfileBoxComponent,
    FriendSuggestionComponent, LikedPagesComponent, CommonWeatherComponent,
    YourGamesComponent, EventsComponent, GalleryComponent,
    FeatherIconComponent, AddFriendCarouselComponent,
    PostDetailsComponent, DetailBoxComponent, SkeletonStyle1Component,
    PostHeaderComponent, LikePanelComponent, PostReactComponent,
    CreatePostComponent, BirthdaySectionComponent, CommonModule],
  templateUrl: './style-1.component.html',
  styleUrl: './style-1.component.scss'
})

export class Style1Component {

  public event = event;
  public isCreatePost: boolean = true;
  public visiblePosts: profile[];
  public post: profile[];
  public displayCount: number = 4;

  constructor(public postServices: PostService,
    public commonServices: CommonService) {
  }

  ngOnInit() {
    this.postServices.style1().subscribe((data) => {
      if (data.style1) {
        this.post = data.style1;
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
