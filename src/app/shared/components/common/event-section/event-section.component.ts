import { Component, Input } from '@angular/core';
import { event1, event2, event3 } from '../../../data/event';
import { EventsComponent } from '../events/events.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-event-section',
  standalone: true,
  imports: [EventsComponent, CarouselModule],
  templateUrl: './event-section.component.html',
  styleUrl: './event-section.component.scss'
})

export class EventSectionComponent {

  public isShow: boolean = false;
  public event1 = event1;
  public event2 = event2;
  public event3 = event3;

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
      600: {
        items: 2,
      },
      1000: {
        items: 8,
      },
    },
  };


}
