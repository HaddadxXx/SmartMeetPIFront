import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/services/common.service';
import { EventService } from '../../shared/services/event.service';
import { SessionService } from '../../shared/services/session.service';
import { Session } from '../../shared/interface/Session';
import { Event } from '../../shared/interface/event';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss'
})
export class SessionsComponent {
  @Input() currentUrl: string;
  events: Event[] = [];
  loading =true ;
 sessions: Session[] = [];
constructor(public commonServices: CommonService,private router: Router , private sessionService :SessionService,
    private eventService :EventService
  ) {
    this.currentUrl = this.router.url;
  }
  ngOnInit(): void {
    this.loadSessions();

  }
 loadSessions(): void {
    this.loading = true;
    this.sessionService.getAllSessions().subscribe({
      next: (sessions) => {
        this.sessions = sessions;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading sessions:', err);
        this.loading = false;
      }
    });
  }

  // Optionnel: Pour obtenir l'événement complet d'une session
  getEventForSession(eventName: string): Event | undefined {
    return this.events.find(event => event.nomEvent === eventName);
  }

  deleteSession(sessionId: string): void {
    if (confirm('Are you sure you want to delete this session?')) {
      this.sessionService.deleteSession(sessionId).subscribe({
        next: () => {
          this.sessions = this.sessions.filter(s => s.idSession !== sessionId);
        },
        error: (err) => console.error('Error deleting session:', err)
      });
    }
  }



}
