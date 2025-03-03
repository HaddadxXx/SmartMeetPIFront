import { Component, Input } from '@angular/core';
import { event1, event2, event3 } from '../../../data/event';
import { EventsComponent } from '../events/events.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { EventService } from '../../../services/event.service';
import { NavigationEnd, Router } from '@angular/router';
import { Event } from '../../../interface/event';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-event-section',
  standalone: true,
  imports: [CommonModule,EventsComponent, CarouselModule],
  templateUrl: './event-section.component.html',
  styleUrl: './event-section.component.scss'
})

export class EventSectionComponent {

  @Input () events: Event[] = [];  // Déclaration de la propriété pour stocker les événements

  public isShow: boolean = false;
  public currentUrl: string;

  // public event1 = event1;
  // public event2 = event2;
  // public event3 = event3;

  constructor(
    private eventService: EventService,
    private router: Router
  ) {
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
        this.events = data; // Mettre à jour la liste des événements
      },
      (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
      }
    );
  }











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
