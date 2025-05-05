import { Component, Input } from '@angular/core';
import { NavbarComponent } from "../layout/navbar/navbar.component";
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { EventService } from '../../shared/services/event.service';
import { Router, RouterLink } from '@angular/router';
import { CommonService } from '../../shared/services/common.service';
import { SessionService } from '../../shared/services/session.service';
import { Event } from '../../shared/interface/event';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-event',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent ,RouterLink, CommonModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  events: Event[] = [];
  @Input() currentUrl: string;


  constructor(public commonServices: CommonService,private router: Router , private sessionService :SessionService,
      private eventService :EventService
    ) {
      this.currentUrl = this.router.url;

    }
    ngOnInit(): void {
      this.loadEvents();
  
    }
    loadEvents() {
      this.eventService.getAllEvents().subscribe({
        next: (data) => {
          console.log('Événements reçus :', data);
          this.events = data.map(event => ({
            ...event,
            dateDebutFormatted: new Date(event.dateDebut).toDateString(),
            dateFinFormatted: new Date(event.dateFin).toDateString()
          }));
        },
        error: (err) => console.error('Erreur de chargement des événements', err)
      });
    }

    
  onDeleteEvent(id: string | undefined): void {
    if (!id) return;
  
    if (confirm('Voulez-vous vraiment supprimer cet événement ?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          this.events = this.events.filter(e => e.idEvent !== id);
        },
        error: err => console.error('Erreur lors de la suppression :', err)
      });
    }
  }
}
