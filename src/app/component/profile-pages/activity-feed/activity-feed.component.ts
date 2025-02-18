import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PostDetailsComponent } from '../../../shared/components/common/posts/post-details/post-details.component';
import { PostHeaderComponent } from '../../../shared/components/common/posts/post-header/post-header.component';
import { ProfileMenuComponent } from '../widgets/profile-menu/profile-menu.component';
import { ProfilePagesComponent } from '../widgets/profile-pages/profile-pages.component';
import { ProfileActivityFeedComponent } from './profile-activity-feed/profile-activity-feed.component';

import { CommonService } from '../../../shared/services/common.service';
import { ProfilePagesService } from '../../../shared/services/profile-Pages/profile-pages.service';
3

import { profile } from '../../../shared/interface/post';
import { TimeLineSkeletonComponent } from '../../../shared/skeleton-loader/profile-pages-skeleton/time-line-skeleton/time-line-skeleton.component';

@Component({
  selector: 'app-activity-feed',
  standalone: true,
  imports: [ProfilePagesComponent, ProfileMenuComponent, ProfileActivityFeedComponent,
    PostHeaderComponent, PostDetailsComponent,TimeLineSkeletonComponent],
  templateUrl: './activity-feed.component.html',
  styleUrl: './activity-feed.component.scss'
})

export class ActivityFeedComponent {

  public postData: profile[];
  public currentUrl : string;

  constructor(public profileServices: ProfilePagesService,public commonServices:CommonService,private router: Router){
    this.currentUrl = this.router.url;

  }

  ngOnInit() {
    this.profileServices.activityFeed().subscribe((data) => {
      if (data.activityFeed) {
        this.postData = data.activityFeed;
        this.postData.filter((element, index) => {
         index === 0 ? element.active = true : element.active = false;
       });
      }
    });
  }

}
