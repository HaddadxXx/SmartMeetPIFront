import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { BirthdayReminderComponent } from '../../../shared/components/common/birthday-reminder/birthday-reminder.component';
import { EventsComponent } from '../../../shared/components/common/events/events.component';
import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { LikedPagesComponent } from '../../../shared/components/common/liked-pages/liked-pages.component';
import { DetailBoxComponent } from '../../../shared/components/common/posts/detail-box/detail-box.component';
import { LikePanelComponent } from '../../../shared/components/common/posts/like-panel/like-panel.component';
import { PostDetailsComponent } from '../../../shared/components/common/posts/post-details/post-details.component';
import { PostHeaderComponent } from '../../../shared/components/common/posts/post-header/post-header.component';
import { PostReactComponent } from '../../../shared/components/common/posts/post-react/post-react.component';
import { PageCoverComponent } from '../widgets/page-cover/page-cover.component';
import { ProfileMenuComponent } from '../widgets/profile-menu/profile-menu.component';
import { AboutDataComponent } from './about-data/about-data.component';

import { GalleryComponent } from '../../../shared/components/common/gallery/gallery.component';
import { CommonService } from '../../../shared/services/common.service';
import { FavoritePagesService } from '../../../shared/services/favorite-pages.service';

import { Router } from '@angular/router';
import { events } from '../../../shared/interface/common';
import { profile } from '../../../shared/interface/post';
import { PageHomeSkeletonComponent } from '../../../shared/skeleton-loader/favorite-pages-skeleton/page-home-skeleton/page-home-skeleton.component';

@Component({
  selector: 'app-page-home',
  standalone: true,
  imports : [CommonModule,FeatherIconComponent,PostDetailsComponent,
    PostHeaderComponent,LikedPagesComponent,DetailBoxComponent,
    LikePanelComponent,PostReactComponent,GalleryComponent,PageHomeSkeletonComponent,
    BirthdayReminderComponent,AboutDataComponent,EventsComponent,
    PageCoverComponent,ProfileMenuComponent],
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.scss'
})

export class PageHomeComponent {

  public isDisplay: boolean = false;
  public post: profile[];
  public visiblePosts: profile[];
  public displayCount: number = 5;
  public isShow: boolean = false;
  public currentUrl: string;

 public event: events = {
   image: 'assets/images/post/12.jpg',
   title: 'happy life event',
   subTitle: '26 january 2024',
   desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
   span: '15256 People Going',
   link: 'interested / not in..',
   class: 'section-t-space ratio2_3'
}

  constructor(public favoritePagesService: FavoritePagesService, 
    public commonServices: CommonService,private router: Router
    ) {
    this.currentUrl = this.router.url;

    }

  ngOnInit() {
    this.favoritePagesService.post().subscribe((data) => {
      this.post = data.homePost;
      this.visiblePosts = this.post.slice(0, this.displayCount);
      this.post.filter((element, index) => {
        index === 0 ? element.active = true : element.active = false;
      });
    });
  }

  refresh() {
    this.displayCount = Math.min(this.displayCount + 1);
    this.visiblePosts = this.post.slice(0, this.displayCount);
  }


}
