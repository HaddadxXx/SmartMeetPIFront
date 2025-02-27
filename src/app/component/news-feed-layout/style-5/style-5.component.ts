import { Component, Input } from '@angular/core';

import { BirthdaySectionComponent } from '../../../shared/components/common/birthday-section/birthday-section.component';
import { CommonWeatherComponent } from '../../../shared/components/common/common-weather/common-weather.component';
import { CreatePostComponent } from '../../../shared/components/common/create-post/create-post.component';
import { EventsComponent } from '../../../shared/components/common/events/events.component';
import { GalleryComponent } from '../../../shared/components/common/gallery/gallery.component';
import { LikedPagesComponent } from '../../../shared/components/common/liked-pages/liked-pages.component';
import { PostDetailsComponent } from '../../../shared/components/common/posts/post-details/post-details.component';
import { PostHeaderComponent } from '../../../shared/components/common/posts/post-header/post-header.component';
import { ProfileBoxComponent } from '../../../shared/components/common/profile-box/profile-box.component';
import { StroyComponent } from '../../../shared/components/common/stroy/stroy.component';
import { GoogleMapComponent } from '../../../shared/components/common/posts/post-details/google-map/google-map.component';

import { PostService } from '../../../shared/services/news-feed-layout/post.service';
import { CommonService } from '../../../shared/services/common.service';

import { birthdayClass, event } from '../../../shared/data/common';
import { profileDataSection } from '../../../shared/interface/post';
import { SkeletonStyle5Component } from '../../../shared/skeleton-loader/news-feed-layout-skeleton/skeleton-style-5/skeleton-style-5.component';

@Component({
  selector: 'app-style-5',
  standalone: true,
  imports: [CreatePostComponent, StroyComponent, PostHeaderComponent,
    PostDetailsComponent, ProfileBoxComponent,
    BirthdaySectionComponent, GalleryComponent, LikedPagesComponent,
    CommonWeatherComponent, EventsComponent,SkeletonStyle5Component,
    GoogleMapComponent],
  templateUrl: './style-5.component.html',
  styleUrl: './style-5.component.scss'
})

export class Style5Component {

  public event = event;
  public birthdayClass = birthdayClass;
  public visiblePosts: profileDataSection[];
  public post: profileDataSection[];
  public displayCount: number = 5;
  public isCreatePost: boolean = true;

  constructor(public postServices: PostService, public commonServices: CommonService) { }

  ngOnInit() {
    this.postServices.style5().subscribe(response => {
      if (response.style5) {
        this.post = response.style5;
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
