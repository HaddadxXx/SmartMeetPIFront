import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SponsoringOfferService } from 'c:/Users/acer/Desktop/SmartMeetPIFront-main (2)/SmartMeetPIFront-main/src/app/shared/services/sponsoring-offer.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'c:/Users/acer/Desktop/SmartMeetPIFront-main (2)/SmartMeetPIFront-main/src/app/shared/services/auth.service';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ContactsSectionComponent } from '../../../company-pages/contacts-us/contacts-section/contacts-section.component';

@Component({
    selector: 'app-sponsoring-offer',
    standalone: true,
    imports: [CommonModule, FormsModule,RouterLink],
    templateUrl: './sponsor.component.html',
    styleUrl: './sponsor.component.scss'
  })
  export class SponsoringOfferComponent {
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
    currentPage: number = 1;
    itemsPerPage: number = 3;
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
            this.serverErrors.title = 'The title cannot be empty.';
            isValid = false;
        }

        // Validation de la description
        if (!this.description?.trim()) {
            this.serverErrors.description = 'The description cannot be empty.';
            isValid = false;
        }

        // Validation du montant
        if (this.amount < 1000) {
            this.serverErrors.amount = 'The amount must be greater than or equal to 1000.';
            isValid = false;
        }

        // Validation de la date
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(this.creationDateString);
        selectedDate.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            this.serverErrors.creationDate = 'The creation date must be today or in the future.';
            isValid = false;
        }

        // Validation du statut lors de la modification
        if (this.currentOfferID && !this.status?.trim()) {
            this.serverErrors.status = 'The status cannot be empty.';
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
          alert("Offer successfully added!");
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
        error: (error) => console.error("Error retrieving offers:", error)
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
        alert("Error: No offer ID selected!");
        return;
      }
  
      const bodyData = this.getOfferPayload();
  
      this.sponsoringOfferService.updateOffer(this.currentOfferID, bodyData).subscribe({
        next: () => {
          alert("Offer successfully updated!");
          this.refreshData();
        },
        error: (error) => this.handleError(error)
      });
    }
  
    setDeleteOffer(data: any): void {
      if (!confirm("Are you sure you want to delete this offer?")) {
        return;
      }
  
      this.sponsoringOfferService.deleteOffer(data.id).subscribe({
        next: () => {
          alert("Offer successfully deleted! ");
          this.refreshData();
        },
        error: (error) => console.error("Error deleting:", error)
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
      console.error("Error:", error);
      if (error.status === 400) {
        this.serverErrors = error.error;
      } else {
        alert("An error occurred, please try again!");
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
 /**
   * Ouvre la modale pour affecter une offre de sponsoring à un événement
   */
 openAffectationModal(offer: any) {
  this.selectedOfferId = offer.id;
  this.showModal = true;

  // Appeler le endpoint de recommandation du backend Spring
  this.http.get(`http://localhost:8084/api/offers/${this.selectedOfferId}/recommend-event`)
    .subscribe({
      next: (resultData: any) => {
        if (resultData) {
          // Si une recommandation existe, la mettre dans un tableau
          this.eventArray = [resultData];
        } else {
          this.eventArray = [];
          console.log("No recommended event found for this offer.");
        }
      },
      error: (error) => {
        console.error("Recommendation error: ", error);
        this.eventArray = [];
        if (error.status === 503) {
          alert("The recommendation service is temporarily unavailable.");
        }
      }
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
    alert("Please select an event!");
    return;
  }

  this.http.put(`http://localhost:8084/api/offers/affecter-event-a-offre/${this.selectedOfferId}/${this.selectedEventId}`, {}, { responseType: 'text' })
    .subscribe({
      next: () => {
        alert("Sponsorship offer successfully assigned! !");
        this.closeModal();
      },
      error: (error) => {
        console.error("Error during assignment:", error);
        alert("The offer is already assigned to this event.");
      }
    });
}



  
  downloadContract(contractId: string) {
    const url = `http://localhost:8084/api/contracts/download/${contractId}`;
    window.open(url, '_blank');
  }
  get paginatedOffers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.offerArray.slice(startIndex, startIndex + this.itemsPerPage);
  }
  
  get totalPages(): number {
    return Math.ceil(this.offerArray.length / this.itemsPerPage);
  }
  }
  