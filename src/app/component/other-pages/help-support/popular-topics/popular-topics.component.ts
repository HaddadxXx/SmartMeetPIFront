import { Component } from '@angular/core';
import { popularTopics } from '../../../../shared/data/others-pages/messenger';
import { RouterModule } from '@angular/router';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SponsoringOfferService } from 'c:/Users/acer/Desktop/SmartMeetPIFront-main (2)/SmartMeetPIFront-main/src/app/shared/services/sponsoring-offer.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'c:/Users/acer/Desktop/SmartMeetPIFront-main (2)/SmartMeetPIFront-main/src/app/shared/services/auth.service';
=======
>>>>>>> NEW_Event_Session

@Component({
  selector: 'app-popular-topics',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterModule,CommonModule, FormsModule],
=======
  imports: [RouterModule],
>>>>>>> NEW_Event_Session
  templateUrl: './popular-topics.component.html',
  styleUrl: './popular-topics.component.scss'
})


export class PopularTopicsComponent {
  public popularTopics = popularTopics;
<<<<<<< HEAD
  offerArray: any[] = [];
  eventArray: any[] = []; // Liste des événements à afficher dans la modale
  title: string = '';
  description: string = '';
  amount: number = 0;
  creationDate: Date = new Date();
  status: string = '';
  currentOfferID: string = '';
  dateError: string | null = null;
  creationDateString: string = new Date().toISOString().split('T')[0];
  minDate: string = new Date().toISOString().split('T')[0];
  submitted = false;
  serverErrors: any = {};
  showModal: boolean = false;
  selectedOfferId: string = '';
  selectedEventId: string = '';
  contractId?: string; // optionnel
  


  //userRoles: string[] = [];
  constructor(private sponsoringOfferService:  SponsoringOfferService, private http: HttpClient, public authService: AuthService) {
    this.getAllOffers();
  }
  /*ngOnInit(): void {
    // Récupère les rôles de l'utilisateur au moment de l'initialisation du composant
    this.userRoles = this.authService.getuserRoles();
  }*/

  saveOffer(): void {
          this.submitted = true;
      this.serverErrors = {};
      let isValid = true;

      // Validation du titre
      if (!this.title?.trim()) {
          this.serverErrors.title = 'Le titre ne peut pas être vide.';
          isValid = false;
      }

      // Validation de la description
      if (!this.description?.trim()) {
          this.serverErrors.description = 'La description ne peut pas être vide.';
          isValid = false;
      }

      // Validation du montant
      if (this.amount < 1000) {
          this.serverErrors.amount = 'Le montant doit être supérieur ou égal à 1000.';
          isValid = false;
      }

      // Validation de la date
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(this.creationDateString);
      selectedDate.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
          this.serverErrors.creationDate = 'La date de création doit être aujourd’hui ou dans le futur.';
          isValid = false;
      }

      // Validation du statut lors de la modification
      if (this.currentOfferID && !this.status?.trim()) {
          this.serverErrors.status = 'Le statut ne peut pas être vide.';
          isValid = false;
      }

      if (!isValid) return;
    this.serverErrors = {};

    if (this.currentOfferID === '') {
      this.createOffer();
    } else {
      this.updateOffer();
    }
  }

  createOffer(): void {
    const bodyData = this.getOfferPayload();

    this.sponsoringOfferService.createOffer(bodyData).subscribe({
      next: () => {
        alert("Offre ajoutée avec succès !");
        this.refreshData();
      },
      error: (error) => this.handleError(error)
    });
  }

  getAllOffers(): void {
    this.sponsoringOfferService.getAllOffers().subscribe({
      next: (data: any) => {
        this.offerArray = data;
      },
      error: (error) => console.error("Erreur lors de la récupération des offres:", error)
    });
  }

  setUpdateOffer(data: any): void {
    this.title = data.title;
    this.description = data.description;
    this.amount = data.amount;
    this.creationDate = new Date(data.creationDate);
    this.status = data.status;
    this.currentOfferID = data.id;
  }

  updateOffer(): void {
    if (!this.currentOfferID) {
      alert("Erreur : Aucun ID d'offre sélectionné !");
      return;
    }

    const bodyData = this.getOfferPayload();

    this.sponsoringOfferService.updateOffer(this.currentOfferID, bodyData).subscribe({
      next: () => {
        alert("Offre mise à jour avec succès !");
        this.refreshData();
      },
      error: (error) => this.handleError(error)
    });
  }

  setDeleteOffer(data: any): void {
    if (!confirm("Voulez-vous vraiment supprimer cette offre ?")) {
      return;
    }

    this.sponsoringOfferService.deleteOffer(data.id).subscribe({
      next: () => {
        alert("Offre supprimée avec succès !");
        this.refreshData();
      },
      error: (error) => console.error("Erreur lors de la suppression:", error)
    });
  }

  resetForm(): void {
    this.title = '';
    this.description = '';
    this.amount = 0;
    this.creationDate = new Date();
    this.status = '';
    this.currentOfferID = '';
    this.serverErrors = {};
  }

  private handleError(error: any): void {
    console.error("Erreur:", error);
    if (error.status === 400) {
      this.serverErrors = error.error;
    } else {
      alert("Une erreur s'est produite, veuillez réessayer !");
    }
  }

  private getOfferPayload(): any {
    return {
      title: this.title.trim(),
      description: this.description.trim(),
      amount: this.amount,
      creationDate: this.creationDate,
      status: this.status.trim()
    };
  }

  private refreshData(): void {
    this.getAllOffers();
    this.resetForm();
  }
  /**
 * Ouvre la modale pour affecter une offre de sponsoring à un événement
 */
openAffectationModal(offer: any) {
  this.selectedOfferId = offer.id;
  this.showModal = true;

  // Charger les événements depuis le backend
  this.http.get("http://localhost:8084/api/events/all")
    .subscribe((resultData: any) => {
      this.eventArray = resultData;
    });
}

/**
 * Ferme la modale d'affectation
 */
closeModal() {
  this.showModal = false;
  this.selectedOfferId = '';
  this.selectedEventId = '';
}

/**
 * Effectue l'affectation de l'offre de sponsoring à l'événement sélectionné
 */
affecterSponsoring() {
  if (!this.selectedOfferId || !this.selectedEventId) {
    alert("Veuillez sélectionner un événement !");
    return;
  }

  this.http.put(`http://localhost:8084/api/offers/affecter-event-a-offre/${this.selectedOfferId}/${this.selectedEventId}`, {}, { responseType: 'text' })
    .subscribe({
      next: () => {
        alert("Offre de sponsoring affectée avec succès !");
        this.closeModal();
      },
      error: (error) => {
        console.error("Erreur lors de l'affectation :", error);
        alert("L'offre est déjà affectée à cet événement");
      }
    });
}


downloadContract(contractId: string) {
  const url = `http://localhost:8084/api/contracts/download/${contractId}`;
  window.open(url, '_blank');
}
=======

>>>>>>> NEW_Event_Session
}
