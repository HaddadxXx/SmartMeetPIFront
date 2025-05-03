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

import { PostService } from '../../../shared/services/news-feed-layout/post.service';
import { CommonService } from '../../../shared/services/common.service';

import { birthdayClass, event } from '../../../shared/data/common';
import { profile } from '../../../shared/interface/post';
import { SkeletonStyle4Component } from '../../../shared/skeleton-loader/news-feed-layout-skeleton/skeleton-style-4/skeleton-style-4.component';

@Component({
  selector: 'app-style-4',
  standalone: true,
  imports: [CreatePostComponent, StroyComponent, ProfileBoxComponent, FriendSuggestionComponent,
    EventsComponent, LikedPagesComponent, CommonWeatherComponent,
    YourGamesComponent, GalleryComponent, BirthdaySectionComponent, SkeletonStyle4Component,
    PostDetailsComponent, PostHeaderComponent,FeatherIconComponent],
  templateUrl: './style-4.component.html',
  styleUrl: './style-4.component.scss'
})

export class Style4Component {

  public birthdayClass = birthdayClass;
  public event = event;
  public displayCount: number = 5;
  public isCreatePost: boolean = true;  
  public postData: profile[];
  public visiblePosts: profile[];
  public post: profile[];

  constructor(public postServices: PostService , public commonServices: CommonService) { }

  ngOnInit() {
    this.postServices.style4().subscribe(response => {
      if(response.style4){
        this.post = response.style4;
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
