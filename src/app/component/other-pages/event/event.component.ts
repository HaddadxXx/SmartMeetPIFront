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
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../../shared/services/session.service';
import { Session } from '../../../shared/interface/Session';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [FeatherIconComponent, EventsComponent, EventCategoryComponent,
    EventSkeletonComponent,CalendarComponent,ReactiveFormsModule,CommonModule,
    EventSectionComponent, CarouselModule, ClickOutSideDirective, RouterModule ,AddEventComponent,OpenModalComponent],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})

export class EventComponent {
  

  events: Event[] = []; // Liste des événements

  sessions: any[] = []; // Déclaration de la propriété sessions

  public isShow: boolean = false;
  public class: string = 'section-t-space ratio2_3';
  public currentUrl: string;

  showSessionModal: boolean = false;

  
  sessionForm: FormGroup; // Formulaire pour créer une session
  selectedEvent: string = ''; // Stocke l'événement sélectionné

  private modalInstance: any;



  constructor(
    private fb: FormBuilder,
    public commonServices: CommonService,
    private router: Router ,  private eventService: EventService, privatemodalService : NgbModal,private sessionService :SessionService) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
    // Initialisation du formulaire de session
    this.sessionForm = this.fb.group({
      titre: ['', Validators.required],
      date: ['', Validators.required],
      nomEvent: ['', Validators.required] // Champ pour sélectionner l'événement
    });

  }
  

  ngOnInit(): void {
    this.getSessions();

    this.getEvents(); // Charger les événements au démarrage
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

 

  openSessionModal() {
    this.showSessionModal = true;
    console.log("Modal ouvert :", this.showSessionModal);
  }
  
  closeSessionModal() {
    this.showSessionModal = false;
    console.log("Modal fermé :", this.showSessionModal);
  }
  

  // onSessionSubmit() {
  //   if (this.sessionForm.valid) {
  //     console.log('Session Data:', this.sessionForm.value);  // Debugging

  //     const sessionData = {
  //       titre: this.sessionForm.value.titre, // Ou 'sessionName' si vous utilisez l'interface Session
  //       date: this.sessionForm.value.date,
  //     };
  //     const eventName = this.sessionForm.value.nomEvent;
  
  //     this.eventService.ajouterSessionEtAffecterAEvenement(sessionData, eventName).subscribe(
  //       (response: any) => {
  //         alert('Session créée et affectée avec succès !');
  //         this.closeSessionModal();
  //       },
  //       (error: any) => { // Ajoutez le type 'any' pour 'error'
  //         console.error('Erreur lors de la création de la session:', error);
  //       }
  //     );
  //   }
  // }
  onSessionSubmit() {
    if (this.sessionForm.valid) {
        console.log('Session Data:', this.sessionForm.value);  // Debugging

        const sessionData = {
            titre: this.sessionForm.value.titre,
            date: this.sessionForm.value.date,
        };
        const eventName = this.sessionForm.value.nomEvent; // Corrigé ici

        if (!eventName) {
            console.error("Erreur: Aucun événement sélectionné !");
            return;
        }

        this.eventService.ajouterSessionEtAffecterAEvenement(sessionData, eventName).subscribe(
            (response: any) => {
                alert('Session créée et affectée avec succès !');
                this.closeSessionModal();
            },
            (error: any) => {
                console.error('Erreur lors de la création de la session:', error);
            }
        );
    }
}


  

  outSideClose() {
    this.isShow = false;
  }

}
