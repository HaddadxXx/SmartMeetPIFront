import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { EventSectionComponent } from '../../../shared/components/common/event-section/event-section.component';
import { EventsComponent } from '../../../shared/components/common/events/events.component';
import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { EventSkeletonComponent } from '../../../shared/skeleton-loader/others-pages-skeleton/event-skeleton/event-skeleton.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventCategoryComponent } from './event-category/event-category.component';

import { ClickOutSideDirective } from '../../../shared/directives/click-out-side.directive';
import { CommonService } from '../../../shared/services/common.service';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [FeatherIconComponent, EventsComponent, EventCategoryComponent,
    EventSkeletonComponent,CalendarComponent,
    EventSectionComponent, CarouselModule, ClickOutSideDirective],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})

export class EventComponent {
  
  public isShow: boolean = false;
  public class: string = 'section-t-space ratio2_3';
  public currentUrl: string;

  constructor(
    public commonServices: CommonService,
    private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  outSideClose() {
    this.isShow = false;
  }

}
