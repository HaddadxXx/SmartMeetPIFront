import { Component, Input } from '@angular/core';
import { CommonWeatherComponent } from '../../../shared/components/common/common-weather/common-weather.component';
import { CreatePostComponent } from '../../../shared/components/common/create-post/create-post.component';
import { FriendSuggestionComponent } from '../../../shared/components/common/friend-suggestion/friend-suggestion.component';
import { LikedPagesComponent } from '../../../shared/components/common/liked-pages/liked-pages.component';
import { PostDetailsComponent } from '../../../shared/components/common/posts/post-details/post-details.component';
import { PostHeaderComponent } from '../../../shared/components/common/posts/post-header/post-header.component';
import { ProfileBoxComponent } from '../../../shared/components/common/profile-box/profile-box.component';
import { StroyComponent } from '../../../shared/components/common/stroy/stroy.component';
import { SkeletonStyle6Component } from '../../../shared/skeleton-loader/news-feed-layout-skeleton/skeleton-style-6/skeleton-style-6.component';

import { CommonService } from '../../../shared/services/common.service';
import { PostService } from '../../../shared/services/news-feed-layout/post.service';

import { profileDataSection } from '../../../shared/interface/post';

@Component({
  selector: 'app-style-6',
  standalone: true,
  imports: [StroyComponent,CreatePostComponent,PostHeaderComponent,SkeletonStyle6Component
    ,PostDetailsComponent,ProfileBoxComponent,FriendSuggestionComponent,
    LikedPagesComponent,CommonWeatherComponent,],
  templateUrl: './style-6.component.html',
  styleUrl: './style-6.component.scss'
})

export class Style6Component {

  public visiblePosts: profileDataSection[];
  public post: profileDataSection[];
  public displayCount: number = 5;
  public isCreatePost: boolean = true;

  constructor(public postServices: PostService ,public commonServices: CommonService) { }

  ngOnInit() {
    this.postServices.style6().subscribe(response => {
      if (response.style6) {
        this.post = response.style6;
        this.visiblePosts = this.post.slice(0, this.displayCount);
        this.post.filter((element) => {
          element.children.forEach((data, index) => {
            index === 0 ? data.active = true : data.active = false;
          })
        });
      }
    })
  }

  refresh() {
    this.displayCount = Math.min(this.displayCount + 1);
    this.visiblePosts = this.post.slice(0, this.displayCount);
  }

}
