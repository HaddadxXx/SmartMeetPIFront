import { Component } from '@angular/core';
<<<<<<< HEAD
import { NavigationEnd, Router } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
=======
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
>>>>>>> NEW_Event_Session

import { EventSectionComponent } from '../../../shared/components/common/event-section/event-section.component';
import { EventsComponent } from '../../../shared/components/common/events/events.component';
import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { EventSkeletonComponent } from '../../../shared/skeleton-loader/others-pages-skeleton/event-skeleton/event-skeleton.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventCategoryComponent } from './event-category/event-category.component';
<<<<<<< HEAD

import { ClickOutSideDirective } from '../../../shared/directives/click-out-side.directive';
import { CommonService } from '../../../shared/services/common.service';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [FeatherIconComponent, EventsComponent, EventCategoryComponent,
    EventSkeletonComponent,CalendarComponent,
    EventSectionComponent, CarouselModule, ClickOutSideDirective],
=======
import { NgChartsModule } from 'ng2-charts';
import {  BaseChartDirective } from 'ng2-charts';
import { registerables } from 'chart.js';
import { Chart } from 'chart.js';
import { ClickOutSideDirective } from '../../../shared/directives/click-out-side.directive';
import { CommonService } from '../../../shared/services/common.service';
import { EventService } from '../../../shared/services/event.service';
import { CommonModule } from '@angular/common';
import { Event } from '../../../shared/interface/event';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../../../shared/services/session.service';
import { Session } from '../../../shared/interface/Session';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { ChartType, NgApexchartsModule } from 'ng-apexcharts';
import { ReviewSectionComponent } from "../../favorite-page/review/review-section/review-section.component";
import { reviewStatement } from '../../../shared/data/charts/apex-charts';
import { review } from '../../../shared/data/favorite-page/favorite-page';
@Component({
  selector: 'app-event',
  standalone: true,
  imports: [FeatherIconComponent, EventsComponent, EventCategoryComponent, NgApexchartsModule,FeatherIconComponent,NgApexchartsModule,
    EventSkeletonComponent, CalendarComponent, FormsModule, ReactiveFormsModule, NgChartsModule, NgChartsModule,
    EventSectionComponent, CarouselModule, ClickOutSideDirective, RouterLink, CommonModule, ReviewSectionComponent],
>>>>>>> NEW_Event_Session
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})

export class EventComponent {
  
  public isShow: boolean = false;
  public class: string = 'section-t-space ratio2_3';
  public currentUrl: string;
<<<<<<< HEAD

  constructor(
    public commonServices: CommonService,
    private router: Router) {
=======
  sessionForm: FormGroup; // Formulaire pour créer une session

  showSessionModal: boolean = false;

  selectedEvent: Event | null = null; // Au lieu de string

  selectedSession: Session | null = null;

  private modalInstance: any;


  public events: Event[] = [];
trendingEvents: Event[] = [];


 public reviewStatement = reviewStatement;
  public review = review;

// Ajoutez ces propriétés pour le graphique
public barChartOptions: ChartConfiguration<'bar'>['options'] = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Événements'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Nombre de participations'
      },
      beginAtZero: true
    }
  },
  plugins: {
    title: {
      display: true,
      text: 'Top 5 des événements tendance'
    },
    legend: {
      display: false
    }
  }
};

public barChartData: ChartData<'bar'> = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1
    }
  ]
};

public barChartType: ChartType = 'bar';
  constructor(
    private fb: FormBuilder,
    public commonServices: CommonService,
    private router: Router,
    private modalService : NgbModal,private http: HttpClient,
    private eventService: EventService , 
    private sessionService :SessionService 

  ) {
>>>>>>> NEW_Event_Session
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
<<<<<<< HEAD
  }

=======
    //Initialisation du formulaire de session
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
  
    this.eventService.getAllEvents().subscribe((data: Event[]) => {
      this.events = data;
    });
  
    this.eventService.getTopTrendingEvents().subscribe({
      next: (data) => {
        this.trendingEvents = data;
        // Mise à jour des données du graphique
        this.barChartData.labels = this.trendingEvents.map(event => event.nomEvent);
        this.barChartData.datasets[0].data = this.trendingEvents.map(event => event.nbParticipations || 0);
      },
      error: (err) => console.error('Erreur lors de la récupération des tendances :', err)
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



>>>>>>> NEW_Event_Session
  outSideClose() {
    this.isShow = false;
  }

}
