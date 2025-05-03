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
import { PostDetailsComponent } from '../../../shared/components/common/posts/post-details/post-details.component';
import { PostHeaderComponent } from '../../../shared/components/common/posts/post-header/post-header.component';
import { ProfileBoxComponent } from '../../../shared/components/common/profile-box/profile-box.component';
import { StroyComponent } from '../../../shared/components/common/stroy/stroy.component';
import { YourGamesComponent } from '../../../shared/components/common/your-games/your-games.component';
import { SkeletonStyle3Component } from '../../../shared/skeleton-loader/news-feed-layout-skeleton/skeleton-style-3/skeleton-style-3.component';

import { CommonService } from '../../../shared/services/common.service';
import { PostService } from '../../../shared/services/news-feed-layout/post.service';

import { birthdayClass, event } from '../../../shared/data/common';
import { profile } from '../../../shared/interface/post';

@Component({
  selector: 'app-style-3',
  standalone: true,
  imports: [StroyComponent, ProfileBoxComponent, BirthdaySectionComponent, GalleryComponent, LikedPagesComponent,
    CommonWeatherComponent, CreatePostComponent, PostHeaderComponent, PostDetailsComponent,
    FeatherIconComponent, CommonModule, YourGamesComponent, EventsComponent, FriendSuggestionComponent, SkeletonStyle3Component],
  templateUrl: './style-3.component.html',
  styleUrl: './style-3.component.scss'
})

export class Style3Component {

  public event = event;
  public birthdayClass = birthdayClass;
  public isCreatePost: boolean = true;
  public displayCount: number = 5;
  public post: profile[];
  public visiblePosts: profile[];

  constructor(public postServices: PostService, public commonServices: CommonService) {
    document.documentElement.style.setProperty('--theme-color', '59, 89, 153');
    document.documentElement.style.setProperty('--theme-light', '240, 243, 249');
    document.body.classList.add('dark-1');  
  }

  ngOnInit() {
    this.postServices.style3().subscribe(response => {
      if (response.style3) {
        this.post = response.style3;
        this.visiblePosts = this.post.slice(0, this.displayCount);
        this.post.filter((element, index) => {
          index === 0 ? element.active = true : element.active = false;
        });
      }
    })
  }

  ngDoCheck() {
    this.commonServices.dark ? document.body.classList.add('dark-1') : document.body.classList.remove('dark-1');
    this.commonServices.dark ? document.body.classList.remove('dark') : this.commonServices.dark;
  }

  refresh() {
    this.displayCount = Math.min(this.displayCount + 1);
    this.visiblePosts = this.post.slice(0, this.displayCount);
  }


  ngOnDestroy() {
    document.documentElement.style.removeProperty('--theme-color');
    document.documentElement.style.removeProperty('--theme-light');
    document.body.classList.remove('dark-1');
  }

}
