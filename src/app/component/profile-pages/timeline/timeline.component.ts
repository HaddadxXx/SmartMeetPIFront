import { Component, Input } from '@angular/core';

import { AboutIntroMySelfComponent } from '../../../shared/components/common/about-intro-my-self/about-intro-my-self.component';
import { ActivityFeedComponent } from '../../../shared/components/common/activity-feed/activity-feed.component';
import { CollegeMeetComponent } from '../../../shared/components/common/college-meet/college-meet.component';
import { CreatePostComponent } from '../../../shared/components/common/create-post/create-post.component';
import { EventsComponent } from '../../../shared/components/common/events/events.component';
import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { FriendSuggestionComponent } from '../../../shared/components/common/friend-suggestion/friend-suggestion.component';
import { GalleryComponent } from '../../../shared/components/common/gallery/gallery.component';
import { LikedPagesComponent } from '../../../shared/components/common/liked-pages/liked-pages.component';
import { PostDetailsComponent } from '../../../shared/components/common/posts/post-details/post-details.component';
import { PostHeaderComponent } from '../../../shared/components/common/posts/post-header/post-header.component';
import { WorldwideTrendsComponent } from '../../../shared/components/common/worldwide-trends/worldwide-trends.component';
import { ProfileMenuComponent } from '../widgets/profile-menu/profile-menu.component';
import { ProfilePagesComponent } from '../widgets/profile-pages/profile-pages.component';
import { TimeLineSkeletonComponent } from '../../../shared/skeleton-loader/profile-pages-skeleton/time-line-skeleton/time-line-skeleton.component';

import { ProfilePagesService } from '../../../shared/services/profile-Pages/profile-pages.service';

import { Router, RouterModule } from '@angular/router';
import { introMySelf } from '../../../shared/data/profile-pages/time-line';
import { events } from '../../../shared/interface/common';
import { profile } from '../../../shared/interface/post';
import { CommonService } from '../../../shared/services/common.service';
import { EventService } from '../../../shared/services/event.service';
import { Event } from '../../../shared/interface/event';
import { EventSectionComponent } from '../../../shared/components/common/event-section/event-section.component';
import { EventComponent } from '../../other-pages/event/event.component';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../../shared/services/session.service';
import { Session } from '../../../shared/interface/Session';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [ProfilePagesComponent, ProfileMenuComponent, AboutIntroMySelfComponent,
    FriendSuggestionComponent, LikedPagesComponent, CollegeMeetComponent,EventComponent,
    GalleryComponent, ActivityFeedComponent, EventsComponent,EventSectionComponent,CommonModule,
    WorldwideTrendsComponent, CreatePostComponent, PostHeaderComponent,RouterModule,
    PostDetailsComponent, FeatherIconComponent,TimeLineSkeletonComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})

export class TimelineComponent {

  @Input() event: any; // Permet de recevoir l'événement


  public introMySelf = introMySelf;
  public isCreatePost: boolean = true;
  public visiblePosts: profile[];
  public post: profile[];
  public displayCount: number = 5;
  public currentUrl : string;

  
  // public event: events = {
  //   image: 'assets/images/post/12.jpg',
  //   title: 'happy life event',
  //   subTitle: '26 january 2024',
  //   desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
  //   span: '15256 People Going',
  //   link: 'interested / not in..',
  //   class: 'section-t-space ratio2_3'
  // }

  public events: Event[] = [];  // Liste des événements
  sessions: any[] = []; // Déclaration de la propriété sessions


  constructor(public profileServices: ProfilePagesService,private router: Router,
    public commonServices:CommonService,private eventService :EventService , private sessionService :SessionService ) {
    this.currentUrl = this.router.url;
    }

  ngOnInit() {
    // this.profileServices.timeLine().subscribe((data) => {
    //   if (data.timeline) {
    //     this.post = data.timeline;
    //     this.visiblePosts = this.post.slice(0, this.displayCount);
    //     this.post.filter((element, index) => {
    //       index === 0 ? element.active = true : element.active = false;
    //     });
    //   }
    // });
    this.getEvents();
    this.getSessions();

  }

  getEvents(): void {
    this.eventService.getEvents().subscribe(
      (data: Event[]) => {
        this.events = data;  // Mettre à jour la liste des événements
      },
      (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
      }
    );
  }

  getSessions(): void {
    this.sessionService.getAllSessions().subscribe(
      (data: any[]) => {
        
        this.sessions = data;
        console.log('Sessions chargées:', this.sessions);

      },
      (error) => {
        console.error('Erreur lors de la récupération des sessions:', error);
      }
    );
  }// Supprimer une session
  deleteSession(id: string): void {
    console.log('ID de la session à supprimer:', id);  // Ajoute ce log
    if (!id) {
      console.error('L\'ID de la session est vide');
      return;
    }
    this.sessionService.deleteSession(id).subscribe(
      () => {
        this.sessions = this.sessions.filter(session => session.idSession !== id);  // Filtrer pour retirer la session supprimée
        console.log(`Session ${id} supprimée`);
      },
      (error) => {
        console.error('Erreur lors de la suppression de la session:', error);
      }
    );
  }

 

  deleteEvent(idE: string | undefined): void { 
    if (idE && confirm("Voulez-vous vraiment supprimer cet événement ?")) { // Vérifier si idE n'est pas undefined
      this.eventService.deleteEvent(idE).subscribe(
        () => {
          this.events = this.events.filter(event => event.idEvent !== idE);
        },
        (error) => {
          console.error("Erreur lors de la suppression de l'événement :", error);
        }
      );
    } else {
      console.error("L'ID de l'événement est invalide.");
    }
  }



  updateEvent(id: string | undefined, event: Event): void {
    // Vérifiez si l'ID est défini avant d'appeler la méthode updateEvent
    if (id) {
      this.eventService.updateEvent(id, event).subscribe(
        (updatedEvent: Event) => {
          const index = this.events.findIndex(e => e.idEvent === id);
          if (index !== -1) {
            this.events[index] = updatedEvent;
          }
  
          this.router.navigate(['/add-event']);
        },
        (error) => {
          console.error("Erreur lors de la mise à jour de l'événement:", error);
        }
      );
    } else {
      console.error("L'ID de l'événement est invalide ou indéfini.");
    }
  }

  
  
  


  // refresh() {
  //   this.displayCount = Math.min(this.displayCount + 1);
  //   this.visiblePosts = this.post.slice(0, this.displayCount);
  // }

}
