import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';


import { RouterModule } from '@angular/router';
import { addFriendCarousel } from '../../../../shared/data/news-feed-layout/news-feed-layout';

@Component({
  selector: 'app-add-friend-carousel',
  standalone: true,
  imports: [CarouselModule,CommonModule,RouterModule],
  templateUrl: './add-friend-carousel.component.html',
  styleUrl: './add-friend-carousel.component.scss'
})

export class AddFriendCarouselComponent {

  public addFriendCarousel = addFriendCarousel ;

  public storyDataOptions = {
    loop: false,
    margin: 20,
    autoplay: false,
    autoplayTimeout: 1000,
    autoplayHoverPause: false,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      450: {
        items: 2,
      },
      600: {
        items: 2.5,
      },
      1000: {
        items: 5,
      },
    },
  };

}
