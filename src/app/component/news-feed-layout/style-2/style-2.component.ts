import { Component, Input } from '@angular/core';
<<<<<<< HEAD

=======
import { Event } from '../../../shared/interface/event';
>>>>>>> NEW_Event_Session
import { CollegeMeetComponent } from '../../../shared/components/common/college-meet/college-meet.component';
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
import { SkeletonStyle2Component } from '../../../shared/skeleton-loader/news-feed-layout-skeleton/skeleton-style-2/skeleton-style-2.component';


import { PostService } from '../../../shared/services/news-feed-layout/post.service';
import { CommonService } from '../../../shared/services/common.service';

<<<<<<< HEAD
import { event } from '../../../shared/data/common';
import { profile } from '../../../shared/interface/post';
=======
//import { event } from '../../../shared/data/common';
import { profile } from '../../../shared/interface/post';
import { EventSectionComponent } from '../../../shared/components/common/event-section/event-section.component';
import { EventService } from '../../../shared/services/event.service';
>>>>>>> NEW_Event_Session


@Component({
  selector: 'app-style-2',
  standalone: true,
  imports: [StroyComponent,ProfileBoxComponent,FriendSuggestionComponent,LikedPagesComponent,SkeletonStyle2Component,
    CommonWeatherComponent,CollegeMeetComponent,GalleryComponent,EventsComponent,YourGamesComponent,
<<<<<<< HEAD
    CreatePostComponent,FeatherIconComponent,PostHeaderComponent,PostDetailsComponent,],
=======
    CreatePostComponent,FeatherIconComponent,PostHeaderComponent,PostDetailsComponent,EventSectionComponent],
>>>>>>> NEW_Event_Session
  templateUrl: './style-2.component.html',
  styleUrl: './style-2.component.scss'
})

export class Style2Component {

<<<<<<< HEAD
  public event = event;
=======
  // public event = event;
  public events: Event[] = [];
  
>>>>>>> NEW_Event_Session
  public post: profile[];
  public visiblePosts: profile[];
  public displayCount: number = 5;
  public isCreatePost: boolean = true;
<<<<<<< HEAD

  constructor(public postServices:PostService,public commonServices : CommonService) {}

  ngOnInit() {
=======
  class: any;

  constructor(public postServices:PostService,public commonServices : CommonService , private eventService : EventService ) {}

  ngOnInit() {
 
>>>>>>> NEW_Event_Session
    this.postServices.style2().subscribe(response => {
      if (response.style2) {
        this.post = response.style2;
        this.visiblePosts = this.post.slice(0, this.displayCount);
        this.post.filter((element, index) => {
          index === 0 ? element.active = true : element.active = false;
        });
      }
    })
<<<<<<< HEAD
=======
  
>>>>>>> NEW_Event_Session
  }

  refresh() {
    this.displayCount = Math.min(this.displayCount + 1);
    this.visiblePosts = this.post.slice(0, this.displayCount);
  }
<<<<<<< HEAD

}
=======
  
}


 
>>>>>>> NEW_Event_Session
