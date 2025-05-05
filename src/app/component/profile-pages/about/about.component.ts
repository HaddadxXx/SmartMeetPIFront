import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AboutIntroMySelfComponent } from '../../../shared/components/common/about-intro-my-self/about-intro-my-self.component';
import { HobbiesInterestComponent } from '../../../shared/components/common/hobbies-interest/hobbies-interest.component';
import { MenuComponent } from '../tab/menu/menu.component';
import { AboutFriendListComponent } from '../widgets/about-friend-list/about-friend-list.component';
import { ProfileMenuComponent } from '../widgets/profile-menu/profile-menu.component';
import { ProfilePagesComponent } from '../widgets/profile-pages/profile-pages.component';

import { CommonService } from '../../../shared/services/common.service';

import { educationWork, hobbyInterests, introMySelfAbout } from '../../../shared/data/profile-pages/about';
import { ProfileAboutSkeletonComponent } from '../../../shared/skeleton-loader/profile-pages-skeleton/profile-about-skeleton/profile-about-skeleton.component';
import { EventService } from '../../../shared/services/event.service';

import { Event} from '../../../shared/interface/event';
import { CommonModule } from '@angular/common';
import { Session } from '../../../shared/interface/Session';
import { SessionService } from '../../../shared/services/session.service';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ProfilePagesComponent, ProfileMenuComponent, AboutIntroMySelfComponent,ProfileAboutSkeletonComponent,
    HobbiesInterestComponent, AboutFriendListComponent, MenuComponent , CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})

export class AboutComponent {
  
  userEmail: string = '';  // Email de l'utilisateur connecté
  events: Event[] = [];
 meetLink: string | null = null;  // Pour stocker le lien Meet généré
  errorMessage: string = '';
  public introMySelfAbout = introMySelfAbout;
  public hobbyInterest = hobbyInterests;
  public educationWork = educationWork;
  @Input() currentUrl: string;
  sessions: Session[] = [];
  loading = true;

  constructor(public commonServices: CommonService,private router: Router , private sessionService :SessionService,
    private eventService :EventService
  ) {
    this.currentUrl = this.router.url;
  }
  ngOnInit(): void {
    this.loadEvents();
    this.loadSessions();

  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (data) => this.events = data,
      error: (err) => console.error('Erreur de chargement des événements', err)
    });
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
  
  onLancerMeet(idEvent: string) {
    this.eventService.lancerMeetPourEvent(idEvent).subscribe((response: any) => {
      console.log("Réponse reçue :", response);
  
      const meetLink = response.meetLink;
  
      if (meetLink) {
        window.open(meetLink, '_blank');
      } else {
        alert("Aucun lien Meet reçu");
      }
    });
  }
  

  

  
}
