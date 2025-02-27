import { Component } from '@angular/core';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';

import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';

@Component({
  selector: 'app-blog-section',
  standalone: true,
  imports: [FeatherIconComponent,CarouselModule,CommonModule],
  templateUrl: './blog-section.component.html',
  styleUrl: './blog-section.component.scss'
})

export class BlogSectionComponent {

  public options = {
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 2,
    autoplayHoverPause: false,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 1, 
      },
      500: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  };
  

  public blogSection = [
    {
      url: 'assets/images/blog/7.jpg'
    },
    {
      url: 'assets/images/blog/8.jpg'
    },
    {
      url: 'assets/images/blog/9.jpg'
    },
    {
      url: 'assets/images/blog/4.jpg'
    },
  ]

}
