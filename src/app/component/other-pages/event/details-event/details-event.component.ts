import { Component } from '@angular/core';
import { EventComponent } from '../event.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { EventService } from '../../../../shared/services/event.service';
import { Event } from '../../../../shared/interface/event';
import { CommonModule } from '@angular/common';
import { EventSkeletonComponent } from "../../../../shared/skeleton-loader/others-pages-skeleton/event-skeleton/event-skeleton.component";
import { CommonService } from '../../../../shared/services/common.service';
@Component({
  selector: 'app-details-event',
  standalone: true,
  imports: [EventComponent, RouterModule, CommonModule, EventSkeletonComponent],
  templateUrl: './details-event.component.html',
  styleUrl: './details-event.component.scss'
})
export class DetailsEventComponent {
  events: Event[] = [];

  constructor(private eventService: EventService ,public commonServices: CommonService,) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
     this.eventService.getEvents().subscribe(
       (data: Event[]) => {
         this.events = data;
         console.log('Événements chargés:', this.events);
       },
       (error) => {
         console.error('Erreur lors de la récupération des événements:', error);
         
       }
     );

    }
    toggleInterested(event: Event): void {
      event.isInterested = !event.isInterested;
    }
    


}
