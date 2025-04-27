import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EventSectionComponent } from '../../../shared/components/common/event-section/event-section.component';
import { EventsComponent } from '../../../shared/components/common/events/events.component';
import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { EventSkeletonComponent } from '../../../shared/skeleton-loader/others-pages-skeleton/event-skeleton/event-skeleton.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventCategoryComponent } from './event-category/event-category.component';

import { ClickOutSideDirective } from '../../../shared/directives/click-out-side.directive';
import { CommonService } from '../../../shared/services/common.service';
import { EventService } from '../../../shared/services/event.service';
import { CommonModule } from '@angular/common';
import { Event } from '../../../shared/interface/event';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../../../shared/services/session.service';
import { Session } from '../../../shared/interface/Session';
@Component({
  selector: 'app-event',
  standalone: true,
  imports: [FeatherIconComponent, EventsComponent, EventCategoryComponent,
    EventSkeletonComponent,CalendarComponent,FormsModule,ReactiveFormsModule,
    EventSectionComponent, CarouselModule, ClickOutSideDirective, RouterLink , CommonModule ],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})

export class EventComponent {
  
  public isShow: boolean = false;
  public class: string = 'section-t-space ratio2_3';
  public currentUrl: string;
  sessionForm: FormGroup; // Formulaire pour créer une session

  showSessionModal: boolean = false;

  selectedEvent: Event | null = null; // Au lieu de string

  selectedSession: Session | null = null;

  private modalInstance: any;


  public events: Event[] = [];

  
  constructor(
    private fb: FormBuilder,
    public commonServices: CommonService,
    private router: Router,
    private modalService : NgbModal,private http: HttpClient,
    private eventService: EventService , 
    private sessionService :SessionService 

  ) {
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
    this.eventService.getAllEvents().subscribe((data: Event[]) => {
      this.events = data;
    });
  }


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
openSessionModal() {
  this.showSessionModal = true;
  console.log("Modal ouvert :", this.showSessionModal);
}

closeSessionModal() {
  this.showSessionModal = false;
  console.log("Modal fermé :", this.showSessionModal);
}



  outSideClose() {
    this.isShow = false;
  }

}
