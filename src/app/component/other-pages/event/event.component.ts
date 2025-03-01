import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { EventSectionComponent } from '../../../shared/components/common/event-section/event-section.component';
import { EventsComponent } from '../../../shared/components/common/events/events.component';
import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { EventSkeletonComponent } from '../../../shared/skeleton-loader/others-pages-skeleton/event-skeleton/event-skeleton.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventCategoryComponent } from './event-category/event-category.component';

import { ClickOutSideDirective } from '../../../shared/directives/click-out-side.directive';
import { CommonService } from '../../../shared/services/common.service';
import { Event } from '../../../shared/interface/event';
import { EventService } from '../../../shared/services/event.service';
import { AddEventComponent } from './add-event/add-event.component';
import { OpenModalComponent } from '../../../shared/components/common/gallery/open-modal/open-modal.component';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [FeatherIconComponent, EventsComponent, EventCategoryComponent,
    EventSkeletonComponent,CalendarComponent,
    EventSectionComponent, CarouselModule, ClickOutSideDirective, RouterModule ,AddEventComponent,OpenModalComponent],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})

export class EventComponent {

  events: Event[] = []; // Liste des événements

  public isShow: boolean = false;
  public class: string = 'section-t-space ratio2_3';
  public currentUrl: string;

  


  constructor(
    public commonServices: CommonService,
    private router: Router ,  private eventService: EventService) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });

  }

  ngOnInit(): void {
    this.getEvents(); // Charger les événements au démarrage
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe(
      (data: Event[]) => {
        this.events = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
      }
    );
  }

  createEvent(event: Event): void {
    this.eventService.createEvent(event).subscribe(
      (newEvent: Event) => {
        this.events.push(newEvent);
      },
      (error) => {
        console.error("Erreur lors de la création de l'événement:", error);
      }
    );
  }

  outSideClose() {
    this.isShow = false;
  }

}
