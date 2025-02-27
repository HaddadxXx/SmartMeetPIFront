import { Component } from '@angular/core';
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
import { StroyComponent } from '../../../shared/components/common/stroy/stroy.component';

import { CommonService } from '../../../shared/services/common.service';
import { PostService } from '../../../shared/services/news-feed-layout/post.service';

import { event } from '../../../shared/data/common';
import { profile } from '../../../shared/interface/post';
import { SkeletonStyle9Component } from '../../../shared/skeleton-loader/news-feed-layout-skeleton/skeleton-style-9/skeleton-style-9.component';

@Component({
  selector: 'app-style-9',
  standalone: true,
  imports: [StroyComponent, CreatePostComponent, BirthdaySectionComponent, 
    GalleryComponent, LikedPagesComponent, EventsComponent,
    FriendSuggestionComponent,PostHeaderComponent, PostDetailsComponent, 
    CommonWeatherComponent ,FeatherIconComponent,SkeletonStyle9Component],
  templateUrl: './style-9.component.html',
  styleUrl: './style-9.component.scss'
})

export class Style9Component {
  public event = event;
  public post: profile[];
  public isCreatePost: boolean = true;
  constructor(public postServices: PostService , public commonServices: CommonService) { }

  ngOnInit() {
    this.postServices.style9().subscribe((data) => {
      if (data.style9) {
        this.post = data.style9;
        this.post.filter((element, index) => {
          index === 0 ? element.active = true : element.active = false;
        });
      }
    });
  }
}
