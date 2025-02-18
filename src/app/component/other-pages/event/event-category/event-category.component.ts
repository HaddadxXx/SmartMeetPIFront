import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';

import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';

import { EventCategoryService } from '../../../../shared/services/event-category.service';
import { event } from '../../../../shared/interface/event';

@Component({
  selector: 'app-event-category',
  templateUrl: './event-category.component.html',
  styleUrl: './event-category.component.scss',
  imports: [FeatherIconComponent,CarouselModule,CommonModule],
  standalone:true
})

export class EventCategoryComponent {

  public eventCategoryList :event[];

  public storyDataOptions = {
    loop: true,
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
      300: {
        items: 3,
      },
      1000: {
        items: 8,
      },
    },
  };

  constructor(public eventServices:EventCategoryService){}

  ngOnInit(){
    this.eventServices.eventCategory().subscribe(response =>{
       this.eventCategoryList = response.eventCategory;
    })
  }

}
