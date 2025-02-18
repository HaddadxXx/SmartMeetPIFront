import { Component, Input } from '@angular/core';
import { BirthdaySectionComponent } from '../../../shared/components/common/birthday-section/birthday-section.component';
import { CommonWeatherComponent } from '../../../shared/components/common/common-weather/common-weather.component';
import { CreatePostComponent } from '../../../shared/components/common/create-post/create-post.component';
import { EventsComponent } from '../../../shared/components/common/events/events.component';
import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { FriendSuggestionComponent } from '../../../shared/components/common/friend-suggestion/friend-suggestion.component';
import { GalleryComponent } from '../../../shared/components/common/gallery/gallery.component';
import { LikedPagesComponent } from '../../../shared/components/common/liked-pages/liked-pages.component';
import { PostDetailsComponent } from '../../../shared/components/common/posts/post-details/post-details.component';
import { PostHeaderComponent } from '../../../shared/components/common/posts/post-header/post-header.component';
import { ProfileBoxComponent } from '../../../shared/components/common/profile-box/profile-box.component';
import { StroyComponent } from '../../../shared/components/common/stroy/stroy.component';
import { YourGamesComponent } from '../../../shared/components/common/your-games/your-games.component';
import { GamesComponent } from '../../other-pages/games/games.component';

import { CommonService } from '../../../shared/services/common.service';
import { PostService } from '../../../shared/services/news-feed-layout/post.service';

import { event } from '../../../shared/data/common';
import { profile } from '../../../shared/interface/post';
import { SkeletonStyle12Component } from '../../../shared/skeleton-loader/news-feed-layout-skeleton/skeleton-style-12/skeleton-style-12.component';

@Component({
  selector: 'app-style-12',
  standalone: true,
  imports: [StroyComponent, ProfileBoxComponent, LikedPagesComponent, 
    FriendSuggestionComponent,BirthdaySectionComponent, YourGamesComponent, 
    EventsComponent, GamesComponent, GalleryComponent,SkeletonStyle12Component,
    CreatePostComponent, PostHeaderComponent,
    PostDetailsComponent, FeatherIconComponent, CommonWeatherComponent],
  templateUrl: './style-12.component.html',
  styleUrl: './style-12.component.scss'
})

export class Style12Component {

  public isCreatePost: boolean = true;
  public event = event;

  public postData: profile[];
  public displayCount: number = 5;
  public visiblePosts: profile[];
  public post: profile[];

  constructor(public postServices: PostService, public commonServices: CommonService) { }

  ngOnInit() {
    this.postServices.style12().subscribe(response => {
      if (response.style12) {
        this.post = response.style12;
        this.visiblePosts = this.post.slice(0, this.displayCount);
        this.post.filter((element, index) => {
          index === 0 ? element.active = true : element.active = false;
        });
      }
    })
  }

  refresh() {
    this.displayCount = Math.min(this.displayCount + 1);
    this.visiblePosts = this.post.slice(0, this.displayCount);
  }

}
