import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';
import { StoryUploadComponent } from '../story-upload/story-upload.component';

import { allStory, stories, storySlider } from '../../../data/common';

@Component({
  selector: 'app-add-stories',
  templateUrl: './add-stories.component.html',
  styleUrl: './add-stories.component.scss',
  imports: [FeatherIconComponent, FeatherIconComponent, CommonModule, CarouselModule],
  standalone: true,
})

export class AddStoriesComponent {

  public allStories = allStory;
  public stories = stories;
  public storySlider = storySlider;
  public emoji = [
    {
      svg: 'assets/svg/emoji/040.svg'
    },
    {
      svg: 'assets/svg/emoji/113.svg'
    },
    {
      svg: 'assets/svg/emoji/027.svg'
    },
    {
      svg: 'assets/svg/emoji/052.svg'
    },
    {
      svg: 'assets/svg/emoji/039.svg'
    },
    {
      svg: 'assets/svg/emoji/042.svg'
    },
  ];

  constructor(public modalServices: NgbModal) { }

  public friendSuggestionOptions = {
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 1,
      },
    },
  };

  uploadStory() {
    this.modalServices.open(StoryUploadComponent, {
      centered: true
    })
  }


}
