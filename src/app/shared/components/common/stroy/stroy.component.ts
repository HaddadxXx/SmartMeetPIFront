import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AddStoriesComponent } from '../../modal/add-stories/add-stories.component';
import { FeatherIconComponent } from '../feather-icon/feather-icon.component';

import { CommonService } from '../../../services/common.service';

import { storyList } from '../../../interface/common';

@Component({
  selector: 'app-stroy',
  standalone: true,
  imports: [FeatherIconComponent, CarouselModule, CommonModule],
  templateUrl: './stroy.component.html',
  styleUrl: './stroy.component.scss'
})

export class StroyComponent {

  public storyData: storyList[];

  public storyOptions = {
    loop: false,
    margin: 20,
    autoplay: false,
    autoplayTimeout: 1000,
    autoplayHoverPause: false,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 2,
      },
      430: {
        items: 3,
      },
      600: {
        items: 3,
      },
      900: {
        items: 5,
      },
      1000: {
        items: 8,
      },
      1350: {
        items: 8,
      }
    },
  };

  constructor(
    public modalServices: NgbModal,
    public commonService: CommonService) {
  }

  ngOnInit() {
    this.commonService.story().subscribe(response => {
      if (response.story) {
        this.storyData = response.story;
      }
    })
  }

  addStory() {
    this.modalServices.open(AddStoriesComponent, {
      fullscreen: true,
      windowClass: 'story-model',
    })
  }

}
