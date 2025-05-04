import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarModule, CalendarView } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { EventColor } from 'calendar-utils';
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { EventService } from '../../../shared/services/event.service';
import { Event } from '../../../shared/interface/event';
import { Session } from '../../../shared/interface/Session';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Router, RouterEvent, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { SessionService } from '../../../shared/services/session.service';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../../shared/services/user.service';
const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
}
@Component({
  selector: 'app-common-calender',
  standalone: true,
  imports: [CommonModule, NgbModule, FormsModule, CalendarModule, FlatpickrModule, RouterModule
    ,RouterOutlet , RouterLink
  ],
  templateUrl: './common-calender.component.html',
  styleUrl: './common-calender.component.scss' ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Ajoute cette ligne ici

})

export class CommonCalenderComponent {

  @Input() isShow : boolean;

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<Component>;
  currentUserId: string = '';
  public view: CalendarView = CalendarView.Month;
  public CalendarView = CalendarView;
  public viewDate: Date = new Date();
  public activeDayIsOpen: boolean = true;
  public color: string;
  public modalData: {
    action: string;
    event: CalendarEvent;
  };

  // public actions: CalendarEventAction[] = [
  //   {
  //     label: '<i class="fas fa-fw fa-pencil-alt"></i>',
  //     a11yLabel: 'Edit',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.handleEvent('Edited', event);
  //     },
  //   },
  //   {
  //     label: '<i class="fas fa-fw fa-trash-alt"></i>',
  //     a11yLabel: 'Delete',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.events = this.events.filter((iEvent) => iEvent !== event);
  //       this.handleEvent('Deleted', event);
  //     },
  //   },
  // ];


  public actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"  style="color: #1d3c6a;"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt" style="color: #1d3c6a;"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteEvent(event); // ✅ utilise bien deleteEvent()
      },
    },
  ];

  public refresh = new Subject<void>();

  public events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: { ...colors['red'] },
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: { ...colors['yellow'] },
    //   actions: this.actions,
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: { ...colors['blue'] },
    //   allDay: true,
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: addHours(new Date(), 2),
    //   title: 'A draggable and resizable event',
    //   color: { ...colors['yellow'] },
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
  ];
eventTemplate: any;
  // actions: { label: string; a11yLabel: string; onClick: ({ event }: { event: CalendarEvent; }) => void; }[];



  constructor(private modal: NgbModal ,private eventService: EventService ,
    private authService : AuthService ,private userService : UserService,
     private router: Router , private sanitizer: DomSanitizer , private SessionService : SessionService ) { 
       // 💡 Sanitize dès ici :
  this.actions = [
    {
      label: this.sanitizer.bypassSecurityTrustHtml('<i class="fas fa-fw fa-pencil-alt" style="color: #1d3c6a;"></i>') as unknown as string,
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: this.sanitizer.bypassSecurityTrustHtml('<i class="fas fa-fw fa-trash-alt" style="color: #1d3c6a;"></i>') as unknown as string,
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteEvent(event);
      },
    },
  ];
     }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(`${action} event`, event);
    
    if (action === 'Edited') {
        // Récupère les données complètes de l'événement depuis le backend
        this.eventService.getEventById(event.meta?.id).subscribe(
            (fullEvent: Event) => {
                // Redirige vers la page d'édition avec les données
                this.router.navigate(['/others/add-event'], {
                    state: { eventData: fullEvent }
                });
            },
            (error) => {
                console.error('Error fetching event details:', error);
            }
        );
    } else {
        // Pour les autres actions (affichage modal)
        this.modalData = { event, action };
        this.modal.open(this.modalContent, { size: 'lg' });
    }
}


  
  ngOnInit(): void { 
     // Récupérer l'utilisateur connecté
  // this.authService.getCurrentUser().subscribe(user => {
  //   this.currentUserId = user.id; // Récupère l'ID de l'utilisateur

    
    this.loadEvents();
    //  });
  }
  
  /** 🔹 Charge les événements et leurs sessions */
  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(events => {
      console.log('Events from service:', events); // Vérifie les données brutes
      
      this.events = events.map((event: Event) => {
  //      const isOwner = event.ownerId && this.currentUserId === event.ownerId; // Vérifie si ownerId existe

        const calendarEvent = {
          title: event.nomEvent,
          start: new Date(event.dateDebut),
          end: new Date(event.dateFin),
          color: colors['blue'],
          draggable: true,
          resizable: { beforeStart: true, afterEnd: true },
          actions: this.actions,
          meta: {
            id: event.idEvent,
            sessions: event.sessions,
            // ownerId: event.ownerId
          }
        };
        console.log('Mapped event:', calendarEvent); // Vérifie chaque événement mappé
        return calendarEvent;
      });
  
  
      events.forEach((event: Event) => {
        if (event.sessions) {
          event.sessions.forEach((session: Session) => {
            this.events.push({
              title: `${session.titre}`, // Afficher le titre de la session
              start: new Date(session.date),
              color: colors['yellow'], // Modifier la couleur de la session si nécessaire
              draggable: false,
              resizable: { beforeStart: false, afterEnd: false },
              meta: { parentEventId: event.idEvent } // Optionnel : lier la session à l'événement parent
            });
          });
        }
      });
      this.events = [...this.events];
  
      this.refresh.next(); // 🔄 Rafraîchit l'affichage
    });
  }
  /** 🔹 Ajoute un nouvel événement */
  addEvent(): void {
  //  const currentUser = this.authService.getCurrentUser().subscribe(user => {
    const newEvent: Event = {
      idEvent: '', // Généré par le backend
      nomEvent: 'Nouvel Événement',
      // date: new Date().toISOString(),
      description: 'Description de l’événement',
      name: 'Organisateur',
      fans: 0,
      images: '',
      theme: 'Thème par défaut',
      dateDebut: new Date().toISOString(),
      dateFin: new Date(new Date().setHours(new Date().getHours() + 2)).toISOString(),
      capacite: 0,
      photo :'',
      typeEvent: 'Conférence',
      sessions: [],
      horaire: '',
      lieu: '',
      participations: [] ,// valeur par défaut
      ownerId:'',
      nbParticipations: 0, // champ temporaire reçu du backend
      tendanceRank: 0 , // rang dans le top 5
      pourcentageParticipation: 0

    //  ownerId: '', 
      //user : [],
     
    };

   
  }
  
  

  /** 🔹 Supprime un événement */
  deleteEvent(eventToDelete: CalendarEvent): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (!confirmDelete) return;
  
    const eventId = eventToDelete.meta?.id; // ✅ bonne clé
    if (!eventId) {
      console.warn('Event has no ID, cannot delete.');
      return;
    }
  
    this.eventService.deleteEvent(eventId.toString()).subscribe({
      next: () => this.loadEvents(),
      error: err => console.error('Error deleting event:', err)
    });
  }


  
  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


}
