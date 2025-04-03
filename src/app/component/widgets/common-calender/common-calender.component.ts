import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarModule, CalendarView } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { EventColor } from 'calendar-utils';
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { Subject } from 'rxjs';
import { EventService } from '../../../shared/services/event.service';
import { SessionService } from '../../../shared/services/session.service';
import { Session } from '../../../shared/interface/Session';
import { Event } from '../../../shared/interface/event';
import { EventComponent } from '../../other-pages/event/event.component';


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
  imports: [CommonModule, NgbModule, FormsModule, CalendarModule, FlatpickrModule],
  templateUrl: './common-calender.component.html',
  styleUrl: './common-calender.component.scss'
})

export class CommonCalenderComponent {

  @Input() isShow : boolean;

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<Component>;

  //vue de calendrier 
  public view: CalendarView = CalendarView.Month;
  public CalendarView = CalendarView;
  public viewDate: Date = new Date();
  public activeDayIsOpen: boolean = true;
  public color: string;

  //donneé pour le modal 
  public modalData: {
    action: string;
    event: CalendarEvent;
  };


  
  

  public actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  //listes des evenments 
  public refresh = new Subject<void>();
  public events: CalendarEvent[] = [];

  // public events: CalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'A 3 day event',
  //     color: { ...colors['red'] },
  //     actions: this.actions,
  //     allDay: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: { ...colors['yellow'] },
  //     actions: this.actions,
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: { ...colors['blue'] },
  //     allDay: true,
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: addHours(new Date(), 2),
  //     title: 'A draggable and resizable event',
  //     color: { ...colors['yellow'] },
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  // ];



  constructor(private modal: NgbModal , private eventService: EventService , private sessionService :SessionService) { }

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
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  // addEvent(): void {
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: 'New event',
  //       start: startOfDay(new Date()),
  //       end: endOfDay(new Date()),
  //       color: colors['red'],
  //       draggable: true,
  //       resizable: {
  //         beforeStart: true,
  //         afterEnd: true,
  //       },
  //     },
  //   ];
  // }

  // deleteEvent(eventToDelete: CalendarEvent) {
  //   this.events = this.events.filter((event) => event !== eventToDelete);
  // }


  ngOnInit(): void {
    this.loadEvents();
  }

  /** 🔹 Charge les événements et leurs sessions */
  loadEvents(): void {
    this.eventService.getEvents().subscribe(events => {
      this.events = events.map((event: Event) => ({
        title: event.nomEvent,
        start: new Date(event.dateDebut), // 🔹 Utilise dateDebut
        end: new Date(event.dateFin), // 🔹 Utilise dateFin
        color: colors['blue'],
        draggable: true,
        resizable: { beforeStart: true, afterEnd: true },
        actions: this.actions,  // 🔹 Ajout des actions ici

      }));

      events.forEach((event: Event) => {
        if (event.sessions) {
          event.sessions.forEach((session: Session) => {
            this.events.push({
              title: session.titre,
              start: new Date(session.date),
             // end: new Date(session.endTime),
              color: colors['yellow'],
              draggable: false,
              resizable: { beforeStart: false, afterEnd: false },
            });
          });
        }
      });

      this.refresh.next(); // 🔄 Rafraîchit l'affichage
    });
  }

  /** 🔹 Ajoute un nouvel événement */
  addEvent(): void {
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
      capacite: 100,
      typeEvent: 'Conférence',
      sessions: [],
      horaire: '',
      lieu: '',
      isInterested: false
    };

    this.eventService.createEvent(newEvent).subscribe(() => {
      this.loadEvents();
    });
  }

  /** 🔹 Supprime un événement */
  deleteEvent(eventToDelete: CalendarEvent): void {
    const foundEvent = this.events.find(e => e.title === eventToDelete.title);
    if (foundEvent) {
      this.eventService.deleteEvent(foundEvent.id as string).subscribe(() => {
        this.loadEvents();
      });
    }
  }

  editEvent(event: CalendarEvent): void {
    if (event) {
    console.log('Modification de l’événement :', event);
    // Logique pour rediriger ou modifier l'événement
  } else {
    console.error('Aucun événement sélectionné pour modification');
  }
  }
  
   

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


}
