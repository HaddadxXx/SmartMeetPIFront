import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RessourceService } from '../../../../shared/services/ressource.service';

@Component({
  selector: 'app-ressource',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ressource.component.html',
  styleUrl: './ressource.component.scss'
})
export class RessourceComponent {
  RessourceArray: any[] = [];
  name: string = '';
  typeR: string = '';
  quantite: number = 0;
  statutR: string = '';
  currentRessourceID: string = "";
  serverErrors: any = {};

  constructor(private ressourceService: RessourceService) {
    this.getAllRessources();
  }

  /**
   * Enregistre ou met à jour une ressource
   */
  saveRess(): void {
    this.serverErrors = {};

   /* // Vérification des champs obligatoires
    if (!this.name.trim() || !this.typeR.trim() || this.quantite <= 0 || !this.statutR.trim()) {
      alert("Veuillez remplir tous les champs correctement !");
      return;
    }*/

    if (this.currentRessourceID === '') {
      this.register();
    } else {
      this.updateRess();
    }
  }

  /**
   * Création d'une nouvelle ressource
   */
  register(): void {
    const bodyData = this.getRessourcePayload();

    this.ressourceService.createRessource(bodyData).subscribe({
      next: () => {
        alert("Ressource ajoutée avec succès !");
        this.refreshData();
      },
      error: (error) => this.handleError(error)
    });
  }

  /**
   * Récupère toutes les ressources
   */
  getAllRessources(): void {
    this.ressourceService.getAllRessources().subscribe({
      next: (data: any) => {
        this.RessourceArray = data;
      },
      error: (error) => console.error("Erreur lors de la récupération des ressources:", error)
    });
  }
  
  /**
   * Prépare la mise à jour d'une ressource
   */
  setUpdateRess(data: any): void {
    this.name = data.name;
    this.typeR = data.typeR;
    this.quantite = data.quantite;
    this.statutR = data.statutR;
    this.currentRessourceID = data.id;
  }

  /**
   * Mise à jour d'une ressource existante
   */
  updateRess(): void {
    if (!this.currentRessourceID) {
      alert("Erreur : Aucun ID de ressource sélectionné !");
      return;
    }

    const bodyData = this.getRessourcePayload();

    this.ressourceService.updateRessource(this.currentRessourceID, bodyData).subscribe({
      next: () => {
        alert("Ressource mise à jour avec succès !");
        this.refreshData();
      },
      error: (error) => this.handleError(error)
    });
  }

  /**
   * Suppression d'une ressource
   */
  setDeleteRess(data: any): void {
    if (!confirm("Do you really want to delete this resource?")) {
      return;
    }

    this.ressourceService.deleteRessource(data.id).subscribe({
      next: () => {
        alert("Resource deleted successfully !");
        this.refreshData();
      },
      error: (error) => console.error("Erreur lors de la suppression:", error)
    });
  }

  /**
   * Réinitialise le formulaire
   */
  resetForm(): void {
    this.name = '';
    this.typeR = '';
    this.quantite = 0;
    this.statutR = '';
    this.currentRessourceID = '';
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
   * Récupère l'objet ressource à envoyer à l'API
   */
  private getRessourcePayload(): any {
    return {
      name: this.name.trim(),
      typeR: this.typeR.trim(),
      quantite: this.quantite,
      statutR: this.statutR.trim()
    };
  }

  /**
   * Rafraîchit la liste des ressources et réinitialise le formulaire
   */
  private refreshData(): void {
    this.getAllRessources();
    this.resetForm();
  }
}
