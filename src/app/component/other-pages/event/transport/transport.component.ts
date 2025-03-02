/*import { Component } from '@angular/core';
import { TransportService } from '../../../../shared/services/transport.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transport',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transport.component.html',
  styleUrl: './transport.component.scss'
})
export class TransportComponent {
  TransportArray: any[] = [];
  type: string = '';
  capacite: number = 0;
  statut: string = '';
  currentTransportID: string = '';

  constructor(private transportService: TransportService) {
    this.getAllTransport();
  }

  getAllTransport(): void {
    this.transportService.getAllTransport().subscribe({
      next: (data) => this.TransportArray = data,
      error: (err) => console.error("Erreur lors de la récupération des transports :", err)
    });
  }

  register(): void {
    const bodyData = { type: this.type, capacite: this.capacite, statut: this.statut };

    this.transportService.createTransport(bodyData).subscribe({
      next: (res) => {
        console.log(res);
        alert("Transport ajouté avec succès !");
        this.getAllTransport();
        this.resetForm();
      },
      error: (err) => console.error("Erreur lors de l'ajout :", err)
    });
  }

  setUpdate(data: any): void {
    this.type = data.type;
    this.capacite = data.capacite;
    this.statut = data.statut;
    this.currentTransportID = data.id;
  }

  updateRecords(): void {
    if (!this.currentTransportID) {
      alert("Erreur : Aucun ID de transport sélectionné !");
      return;
    }

    const bodyData = { type: this.type, capacite: this.capacite, statut: this.statut };

    this.transportService.updateTransport(this.currentTransportID, bodyData).subscribe({
      next: (res) => {
        console.log(res);
        alert("Transport mis à jour avec succès !");
        this.getAllTransport();
        this.resetForm();
      },
      error: (err) => console.error("Erreur lors de la mise à jour :", err)
    });
  }

  save(): void {
    this.currentTransportID ? this.updateRecords() : this.register();
  }

  setDelete(data: any): void {
    this.transportService.deleteTransport(data.id).subscribe({
      next: (res) => {
        console.log(res);
        alert("Transport supprimé avec succès !");
        this.getAllTransport();
      },
      error: (err) => console.error("Erreur lors de la suppression :", err)
    });
  }

  resetForm(): void {
    this.currentTransportID = '';
    this.type = '';
    this.capacite = 0;
    this.statut = '';
  }
}*/
import { Component } from '@angular/core';
import { TransportService } from '../../../../shared/services/transport.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transport',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  constructor(private transportService: TransportService) {
    this.getAllTransport();
  }

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
        alert("Transport ajouté avec succès !");
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
      error: (error) => console.error("Erreur lors de la récupération des transports:", error)
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
      alert("Erreur : Aucun ID de transport sélectionné !");
      return;
    }

    const bodyData = this.getTransportPayload();

    this.transportService.updateTransport(this.currentTransportID, bodyData).subscribe({
      next: () => {
        alert("Transport mis à jour avec succès !");
        this.refreshData();
      },
      error: (error) => this.handleError(error)
    });
  }

  /**
   * Suppression d'un transport
   */
  setDeleteTransport(data: any): void {
    if (!confirm("Voulez-vous vraiment supprimer ce transport ?")) {
      return;
    }

    this.transportService.deleteTransport(data.id).subscribe({
      next: () => {
        alert("Transport supprimé avec succès !");
        this.refreshData();
      },
      error: (error) => console.error("Erreur lors de la suppression:", error)
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
      alert("Une erreur s'est produite, veuillez réessayer !");
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
}