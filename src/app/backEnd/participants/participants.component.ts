import { Component } from '@angular/core';
import { EventService } from '../../shared/services/event.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Event } from '../../shared/interface/event';
@Component({
  selector: 'app-participants',
  standalone: true,
  imports: [CommonModule , RouterModule],
  templateUrl: './participants.component.html',
  styleUrl: './participants.component.scss'
})
export class ParticipantsComponent {
  events: Event[] = [];
  selectedEvent: Event | null = null;
  participants: string[] = [];
  loading = false;
  showParticipants = false;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.events = events;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading events:', err);
        this.loading = false;
      }
    });
  }

  loadParticipants(eventId: string): void {
    this.loading = true;
    this.eventService.getParticipantsEmailsByEventId(eventId).subscribe({
      next: (emails: string[]) => { // emails est directement le tableau
        this.participants = emails || []; // Assignation directe du tableau
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading participants:', err);
        this.loading = false;
      }
    });
  }
  closeParticipants(): void {
    this.showParticipants = false;
    this.selectedEvent = null;
    this.participants = [];
  }

}
