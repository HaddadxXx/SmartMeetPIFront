import { Component } from '@angular/core';

import { AboutIntroMySelfComponent } from '../../../shared/components/common/about-intro-my-self/about-intro-my-self.component';
import { ActivityFeedComponent } from '../../../shared/components/common/activity-feed/activity-feed.component';
import { CollegeMeetComponent } from '../../../shared/components/common/college-meet/college-meet.component';
import { CreatePostComponent } from '../../../shared/components/common/create-post/create-post.component';
import { EventsComponent } from '../../../shared/components/common/events/events.component';
import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { FriendSuggestionComponent } from '../../../shared/components/common/friend-suggestion/friend-suggestion.component';
import { GalleryComponent } from '../../../shared/components/common/gallery/gallery.component';
import { LikedPagesComponent } from '../../../shared/components/common/liked-pages/liked-pages.component';
import { PostDetailsComponent } from '../../../shared/components/common/posts/post-details/post-details.component';
import { PostHeaderComponent } from '../../../shared/components/common/posts/post-header/post-header.component';
import { WorldwideTrendsComponent } from '../../../shared/components/common/worldwide-trends/worldwide-trends.component';
import { ProfileMenuComponent } from '../widgets/profile-menu/profile-menu.component';
import { ProfilePagesComponent } from '../widgets/profile-pages/profile-pages.component';
import { TimeLineSkeletonComponent } from '../../../shared/skeleton-loader/profile-pages-skeleton/time-line-skeleton/time-line-skeleton.component';

import { ProfilePagesService } from '../../../shared/services/profile-Pages/profile-pages.service';

import { Router, RouterModule } from '@angular/router';
import { introMySelf } from '../../../shared/data/profile-pages/time-line';
import { events } from '../../../shared/interface/common';
import { profile } from '../../../shared/interface/post';
import { CommonService } from '../../../shared/services/common.service';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [ProfilePagesComponent, ProfileMenuComponent, AboutIntroMySelfComponent,
    FriendSuggestionComponent, LikedPagesComponent, CollegeMeetComponent,
    GalleryComponent, ActivityFeedComponent, EventsComponent,
    WorldwideTrendsComponent, CreatePostComponent, PostHeaderComponent,RouterModule,
    PostDetailsComponent, FeatherIconComponent,TimeLineSkeletonComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})

export class TimelineComponent {

  public introMySelf = introMySelf;
  public isCreatePost: boolean = true;
  public visiblePosts: profile[];
  public post: profile[];
  public displayCount: number = 5;
  public currentUrl : string;

  public event: events = {
    image: 'assets/images/post/12.jpg',
    title: 'happy life event',
    subTitle: '26 january 2024',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    span: '15256 People Going',
    link: 'interested / not in..',
    class: 'section-t-space ratio2_3'
  }

  constructor(public profileServices: ProfilePagesService,private router: Router,
    public commonServices:CommonService) {
    this.currentUrl = this.router.url;
    }

  ngOnInit() {
    this.profileServices.timeLine().subscribe((data) => {
      if (data.timeline) {
        this.post = data.timeline;
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
