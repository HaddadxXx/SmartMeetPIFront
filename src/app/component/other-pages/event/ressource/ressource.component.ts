import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RessourceService } from '../../../../shared/services/ressource.service';
import { EventSectionComponent } from '../../../../shared/components/common/event-section/event-section.component';
import { CommonService } from '../../../../shared/services/common.service';
import { EventSkeletonComponent } from "../../../../shared/skeleton-loader/others-pages-skeleton/event-skeleton/event-skeleton.component";
import { FeatherComponent } from '../../../element-pages/icons/feather/feather.component';
import { FeatherIconComponent } from "../../../../shared/components/common/feather-icon/feather-icon.component";

@Component({
  selector: 'app-ressource',
  standalone: true,
  imports: [CommonModule, FormsModule, EventSectionComponent, EventSkeletonComponent, FeatherComponent, FeatherIconComponent],
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
  //////////////////////////
  showModall: boolean = false;
  selectedRessourceId: string = '';
  selectedSessionId: string = '';
  sessionArray: any[] = [];


  constructor(private ressourceService: RessourceService, public commonServices :CommonService) {
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
        alert("Resource added successfully!");
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
      error: (error) => console.error("Error retrieving resources:", error)
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
      alert("Error: No resource ID selected!");
      return;
    }

    const bodyData = this.getRessourcePayload();

    this.ressourceService.updateRessource(this.currentRessourceID, bodyData).subscribe({
      next: () => {
        alert("Resource updated successfully!");
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
      error: (error) => console.error("Error during deletion:", error)
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
      alert("An error occurred, please try again!");
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

  // Ouvrir la modal et charger les événements
  openAffectationModall(ressource: any) {
    this.selectedRessourceId = ressource.id;
    this.showModall = true;

    this.ressourceService.getAllSessions().subscribe((resultData: any) => {
      this.sessionArray = resultData;
    });
  }

  // Fermer la modal
  closeModall() {
    this.showModall = false;
    this.selectedRessourceId = '';
    this.selectedSessionId = '';
  }

  // Affecter un transport à un événement
  affecterRessource() {
    if (!this.selectedRessourceId || !this.selectedSessionId) {
      alert("Please select a session!");
      return;
    }

    this.ressourceService.affecterRessource(this.selectedSessionId, this.selectedRessourceId)
      .subscribe(
        (resultData) => {
          alert("Ressource successfully assigned!");
          this.closeModall();
        },
        (error) => {
          console.error("Error during assignment:", error);
          alert("The ressource is already assigned to this session!");
        }
      );
  }
}
