import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AddStoriesComponent } from '../../modal/add-stories/add-stories.component';
import { FeatherIconComponent } from '../feather-icon/feather-icon.component';
import { PostService } from '../../../services/news-feed-layout/post.service';
import { CommonService } from '../../../services/common.service';
import { Story } from '../../../interface/post';

@Component({
  selector: 'app-stroy',
  standalone: true,
  imports: [FeatherIconComponent, CarouselModule, CommonModule],
  templateUrl: './stroy.component.html',
  styleUrl: './stroy.component.scss'
})
export class StroyComponent {
  public storyOptions = {
    loop: false,
    margin: 20,
    autoplay: false,
    autoplayTimeout: 1000,
    autoplayHoverPause: false,
    dots: false,
    nav: false,
    responsive: {
      0: { items: 2 },
      430: { items: 3 },
      600: { items: 3 },
      900: { items: 5 },
      1000: { items: 8 },
      1350: { items: 8 }
    },
  };

  public storyData: Story[] = [];
  public selectedStory: Story | null = null;

  constructor(
    public modalServices: NgbModal,
    public commonService: CommonService, private postService :PostService
  ) {}

  ngOnInit() {
    this.postService.getStories().subscribe(response => {
      if (response && Array.isArray(response)) {
        this.storyData = [
          {
            images: 'assets/images/story-bg.jpg',
            plusImg: 'assets/images/icon/plus.png',
            uname: 'Add Stories',
            class: '',
          },
          ...response.map((item: any) => ({
            imageUrl: item.imageUrl,
            user: item.user,
            status: item.status || 'Active Now',
            class: item.cssClass || '',
            uname: item.user ? `${item.user.firstName} ${item.user.lastName}` : '',
          }))
        ];
        console.log('storyData après mapping :', this.storyData);
      }
    });
    
  }
  
  

  addStory() {
    this.modalServices.open(AddStoriesComponent, {
      fullscreen: true,
      windowClass: 'story-model',
    });
  }

  

  showStory(story: Story) {
    console.log('showStory appelé avec :', story);
    this.selectedStory = story;
  }
  
  

  closeViewer() {
    this.selectedStory = null;
  }



 
}