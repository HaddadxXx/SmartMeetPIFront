import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SponsorshipRequestService } from 'c:/Users/acer/Downloads/nchalahLekher/src/app/shared/services/sponsorRequest.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'c:/Users/acer/Desktop/SmartMeetPIFront-main (2)/SmartMeetPIFront-main/src/app/shared/services/auth.service';

@Component({
  selector: 'app-sponsor-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sponsorRequest.component.html',
  styleUrls: ['./sponsorRequest.component.scss']
})
export class SponsorRequestComponent {
  requestArray: any[] = [];
  eventDescription: string = '';
  statusR: string = 'PENDING';
  requestDate: string = new Date().toISOString().split('T')[0];
  currentRequestID: string = '';
  serverErrors: any = {};
  submitted = false;
  minDate: string = new Date().toISOString().split('T')[0];
  selectedRequestId: string = '';
  selectedEventId: string = '';
  showModal: boolean = false;
  eventArray: any[] = [];
  //userRoles: string[] = [];

  eventId: string = ''; // Stocker l'ID de l'événement sélectionné

  constructor(private requestService: SponsorshipRequestService, private http: HttpClient, public authService: AuthService) {
    this.getAllRequests();
  }
  /*ngOnInit(): void {
    // Récupère les rôles de l'utilisateur au moment de l'initialisation du composant
    this.userRoles = this.authService.getuserRoles();
  }*/
  affecterRequest(eventId: string, requestId: string) {
    this.requestService.affecterSponsorRequest(eventId, requestId).subscribe({
      next: (response) => {
        alert('Demande de sponsoring associée avec succès !');
      },
      error: (error) => {
        console.error('Erreur lors de l’association', error);
        alert('Erreur lors de l’association de la demande.');
      }
    });
  }
  saveRequest(): void {
    this.submitted = true;
    this.serverErrors = {};

    if (!this.validateForm()) return;

    const bodyData = this.getOfferPayload();

    if (this.currentRequestID) {
      this.updateRequest(bodyData);
    } else {
      this.createRequest(bodyData);
    }
  }

  private getOfferPayload(): any {
    return {
      eventDescription: this.eventDescription.trim(),
      statusR: this.statusR,
      requestDate: new Date(this.requestDate)
    };
  }

  private validateForm(): boolean {
    let isValid = true;

    if (!this.eventDescription?.trim()) {
      this.serverErrors.eventDescription = 'La description est obligatoire';
      isValid = false;
    }

    const selectedDate = new Date(this.requestDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      this.serverErrors.requestDate = 'La date doit être aujourdhui ou dans le futur';
      isValid = false;
    }

    return isValid;
  }

  private createRequest(data: any): void {
    this.requestService.createRequest(data).subscribe({
      next: () => {
        alert('Demande créée !');
        this.refreshData();
      },
      error: (error) => this.handleError(error)
    });
  }

  getAllRequests(): void {
    this.requestService.getAllRequests().subscribe({
      next: (data: any) => this.requestArray = data,
      error: (error) => console.error('Erreur:', error)
    });
  }

  setUpdateRequest(request: any): void {
    this.eventDescription = request.eventDescription;
    this.statusR = request.statusR;
    this.requestDate = new Date(request.requestDate).toISOString().split('T')[0];
    this.currentRequestID = request.id;
  }

  private updateRequest(data: any): void {
    this.requestService.updateRequest(this.currentRequestID, data).subscribe({
      next: () => {
        alert('Demande modifiée !');
        this.refreshData();
      },
      error: (error) => this.handleError(error)
    });
  }

  setDeleteRequest(id: string): void {
    if (confirm('Supprimer cette demande ?')) {
      this.requestService.deleteRequest(id).subscribe({
        next: () => {
          alert('Demande supprimée !');
          this.getAllRequests();
        },
        error: (error) => console.error('Erreur:', error)
      });
    }
  }

  private handleError(error: any): void {
    if (error.status === 400) {
      this.serverErrors = error.error;
    } else {
      alert('Erreur serveur');
    }
  }

  private refreshData(): void {
    this.getAllRequests();
    this.resetForm();
  }

  resetForm(): void {
    this.eventDescription = '';
    this.statusR = 'PENDING';
    this.requestDate = new Date().toISOString().split('T')[0];
    this.currentRequestID = '';
    this.submitted = false;
  }

  
}
