import { Component } from '@angular/core';
import { EventService } from '../../../../shared/services/event.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, FormSubmittedEvent, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import { Event } from '../../../../shared/interface/event';
import { Session } from '../../../../shared/interface/Session';
import { NgbModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { User, UserService } from '../../../../shared/services/user.service';
@Component({
  selector: 'app-details-event',
  standalone: true,
  imports: [CommonModule , FormsModule , ReactiveFormsModule  , RouterModule ,NgbModalModule , NgbModule],
  templateUrl: './details-event.component.html',
  styleUrl: './details-event.component.scss'
})
export class DetailsEventComponent {
  totalPages: number = 0; // Nombre total de pages

  events: any[] = [];
  showFilters = false;
  selectedEvent?: Event; // Make it optional since it might be undefined initially
  selectedFile: File | null = null;
  currentUser: User | null = null;
  participationData = {
    email: '',
    firstName: '',
    lastName: '',
    eventId: ''
  };

  filteredEvents: any[] = [];
  currentPage: number = 0; // Page actuelle
  pageSize: number = 4; // Taille de la page (nombre d'événements par page)
 // totalPages = 0;

  selectedThemes : Boolean =false ;
  filters = {
    typeEvent: '',
    themes: [] as string[],
    month: ''
  };

  availableThemes: string[] = ['Robotique', 'IA', 'Cybersécurité', 'Développement'];
  months: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
 // selectedEvent: Event;
  //modalService: any;
 
  
  applyFilter() {
    // Implémenter la logique de filtrage ici selon tes données récupérées
  }

  constructor(private eventService: EventService , private authService :AuthService , private modalService: NgbModal , private userService : UserService) {}

  ngOnInit(): void {
    this.loadEvents();
    this.loadPaginatedEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (res) => this.events = res,
      error: (err) => console.error(err)
    });
  }
  
 // Charger les événements avec pagination
 loadPaginatedEvents(): void {
  this.eventService.getPaginatedEvents(this.currentPage, this.pageSize).subscribe({
    next: (data) => {
      this.events = data.content; // Données des événements
      this.totalPages = data.totalPages; // Nombre total de pages
      this.currentPage = data.number; // Page actuelle
      console.log('Événements récupérés :', data);
    },
    error: (err) => {
      console.error('Erreur lors du chargement des événements paginés:', err);
    }
  });
}

// Méthode pour naviguer vers une autre page de résultats
goToPage(page: number): void {
  if (page >= 0 && page < this.totalPages) { // Vérifie que la page est dans les limites
    this.currentPage = page;
    this.loadPaginatedEvents(); // Recharge les événements pour la page sélectionnée
  }
}

// Ouvrir la modale en passant le contenu
openParticipationModal(content: any, nomEvent: string) {
  const foundEvent = this.events.find(e => e.nomEvent === nomEvent);

  if (!foundEvent) {
    console.log('Aucun événement trouvé avec ce nom :', nomEvent);
    return;
  }
 // Si l'utilisateur est déjà chargé, mettez à jour les données
 if (this.currentUser) {
  this.participationData.email = this.currentUser.email;
  this.participationData.firstName = this.currentUser.firstName;
  this.participationData.lastName = this.currentUser.lastName;
}
  this.selectedEvent = foundEvent;
  console.log('Événement sélectionné :', this.selectedEvent);

  this.modalService.open(content); // <= ici, "content" doit être défini par #participationModal
}


// Exemple de méthode pour sélectionner un événement
selectEvent(event: Event) {
  this.selectedEvent = event;  // Assurez-vous que selectedEvent est bien défini
}
onFileSelected(event: any) {
  this.selectedFile = event.target.files[0] as File;
}

onSubmitParticipation() {
  if (!this.selectedEvent?.idEvent || !this.participationData.email) {
    console.error('Required data is missing');
    return;
  }

  const formData = new FormData();
  
  // Add required fields with type safety
  formData.append('email', this.participationData.email);
  formData.append('eventId', this.selectedEvent.idEvent);
  
  // Add file only if it exists
  if (this.selectedFile) {
    formData.append('file', this.selectedFile);
  }

  this.eventService.participateToEvent(formData).subscribe({
    next: (response) => {
      console.log('Participation successful:', response);
      this.modalService.dismissAll();
      // Add success notification here
    },
    error: (error) => {
      console.error('Participation error:', error);
      // Add error notification here
    }
  });
}

//user
loadCurrentUser() {
  this.authService.getCurrentUser().subscribe({
    next: (user) => {
      this.currentUser = user;
      this.participationData = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        eventId: this.participationData.eventId // conserve l'eventId si déjà défini
      };
    },
    error: (err) => {
      console.error('Erreur lors du chargement du profil utilisateur:', err);
      this.currentUser = null;
    }
  });
}

}
