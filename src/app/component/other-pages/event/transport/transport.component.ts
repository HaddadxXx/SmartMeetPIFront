import { Component } from '@angular/core';
import { TransportService } from '../../../../shared/services/transport.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventSkeletonComponent } from "../../../../shared/skeleton-loader/others-pages-skeleton/event-skeleton/event-skeleton.component";
import { FeatherIconComponent } from "../../../../shared/components/common/feather-icon/feather-icon.component";
import { CommonService } from '../../../../shared/services/common.service';

@Component({
  selector: 'app-transport',
  standalone: true,
  imports: [CommonModule, FormsModule, EventSkeletonComponent, FeatherIconComponent],
  templateUrl: './transport.component.html',
  styleUrl: './transport.component.scss'
})
export class TransportComponent {
  TransportArray: any[] = [];
  type: string = '';
  capacite: number = 0;
  statut: string = '';
  currentTransportID: string = '';
  serverErrors: any = {};
  //////////////////////////
  showModal: boolean = false;
  selectedTransportId: string = '';
  selectedEventId: string = '';
  eventArray: any[] = [];
  

  constructor(private transportService: TransportService, public commonServices : CommonService) {
    this.getAllTransport();
  }

  ngOnInit(): void {}
  /**
   * Enregistre ou met à jour un transport
   */
  saveTransport(): void {
    this.serverErrors = {};

    if (this.currentTransportID === '') {
      this.register();
    } else {
      this.updateTransport();
    }
  }

  /**
   * Création d'un nouveau transport
   */
  register(): void {
    const bodyData = this.getTransportPayload();

    this.transportService.createTransport(bodyData).subscribe({
      next: () => {
        alert("Transport added successfully!");
        this.refreshData();
      },
      error: (error) => this.handleError(error)
    });
  }

  /**
   * Récupère tous les transports
   */
  getAllTransport(): void {
    this.transportService.getAllTransports().subscribe({
      next: (data: any) => {
        this.TransportArray = data;
      },
      error: (error) => console.error("Error while retrieving transports:", error)
    });
  }

  /**
   * Prépare la mise à jour d'un transport
   */
  setUpdateTransport(data: any): void {
    this.type = data.type;
    this.capacite = data.capacite;
    this.statut = data.statut;
    this.currentTransportID = data.id;
  }

  /**
   * Mise à jour d'un transport existant
   */
  updateTransport(): void {
    if (!this.currentTransportID) {
      alert("Error: No transport ID selected!");
      return;
    }

    const bodyData = this.getTransportPayload();

    this.transportService.updateTransport(this.currentTransportID, bodyData).subscribe({
      next: () => {
        alert("Transport updated successfully!");
        this.refreshData();
      },
      error: (error) => this.handleError(error)
    });
  }

  /**
   * Suppression d'un transport
   */
  setDeleteTransport(data: any): void {
    if (!confirm("Do you really want to delete this transport?")) {
      return;
    }

    this.transportService.deleteTransport(data.id).subscribe({
      next: () => {
        alert("Transport deleted successfully!");
        this.refreshData();
      },
      error: (error) => console.error("Error during deletion:", error)
    });
  }

  /**
   * Réinitialise le formulaire
   */
  resetForm(): void {
    this.type = '';
    this.capacite = 0;
    this.statut = '';
    this.currentTransportID = '';
    this.serverErrors = {};
  }

  /**
   * Gère les erreurs du backend et met à jour `serverErrors`
   */
  private handleError(error: any): void {
    console.error("Erreur:", error);
    if (error.status === 400) {
      this.serverErrors = error.error;
    } else {
      alert("An error occurred, please try again!");
    }
  }

  /**
   * Récupère l'objet transport à envoyer à l'API
   */
  private getTransportPayload(): any {
    return {
      type: this.type.trim(),
      capacite: this.capacite,
      statut: this.statut.trim()
    };
  }

  /**
   * Rafraîchit la liste des transports et réinitialise le formulaire
   */
  private refreshData(): void {
    this.getAllTransport();
    this.resetForm();
  }
  
  // Ouvrir la modal et charger les événements
  openAffectationModal(transport: any) {
    this.selectedTransportId = transport.id;
    this.showModal = true;

    this.transportService.getAllEvents().subscribe((resultData: any) => {
      this.eventArray = resultData;
    });
  }

  // Fermer la modal
  closeModal() {
    this.showModal = false;
    this.selectedTransportId = '';
    this.selectedEventId = '';
  }

  // Affecter un transport à un événement
  affecterTransport() {
    if (!this.selectedTransportId || !this.selectedEventId) {
      alert("Please select an event!");
      return;
    }

    this.transportService.affecterTransport(this.selectedEventId, this.selectedTransportId)
      .subscribe(
        (resultData) => {
          alert("Transport successfully assigned!");
          this.closeModal();
        },
        (error) => {
          console.error("Error during assignment:", error);
          alert("The transport is already assigned to this event!");
        }
      );
  }
}