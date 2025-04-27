import { Component, Input } from '@angular/core';
//import { event1, event2, event3 } from '../../../data/event';
import { EventsComponent } from '../events/events.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../interface/event';
@Component({
  selector: 'app-event-section',
  standalone: true,
  imports: [EventsComponent, CarouselModule , CommonModule],
  templateUrl: './event-section.component.html',
  styleUrl: './event-section.component.scss'
})

export class EventSectionComponent {

  public isShow: boolean = false;
  public allEvents: any[] = [];
  // public event1 = event1;
  // public event2 = event2;
  // public event3 = event3;

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

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe((events) => {
      this.allEvents = events;
    });
  }

}
