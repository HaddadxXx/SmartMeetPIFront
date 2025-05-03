 import { Component, EventEmitter, Output } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
 import { FormsModule } from '@angular/forms';
 import { CommonModule } from '@angular/common';
 import { GroupService } from '../../../../shared/services/group.service'; // Importez le service
 import { MatDialogRef } from '@angular/material/dialog';
 // Modèle de données côté front
 interface Group {
   name: string;
   description: string;
   visibility: string; // "PUBLIC" ou "PRIVATE"
   photo?: string;     // URL de l'image (optionnel si gérée côté serveur)
 }
 @Component({
   selector: 'app-group-popup',
   templateUrl: './group-popup.component.html',
   standalone: true,
   imports: [FormsModule, CommonModule],
   styleUrls: ['./group-popup.component.scss'],
 })
 export class GroupPopupComponent {

   @Output() groupCreated = new EventEmitter<void>(); // Émet un événement lorsque le groupe est créé
   groupData: Group = {
     name: '',
     description: '',
     visibility: 'PUBLIC', // Par défaut
   };
   selectedFile: File | null = null;
   constructor(private groupService: GroupService, private dialogRef: MatDialogRef<GroupPopupComponent> ) {}
   // Gère la sélection du fichier
   onFileSelected(event: any): void {
     this.selectedFile = event.target.files[0]; // Récupérez le fichier sélectionné
   }
   errorMessage: string | null = null;

   // Gère la soumission du formulaire
   onSubmit(): void {
     this.groupService.createGroup(this.groupData, this.selectedFile).subscribe({
       next: (response) => {
         console.log('Groupe créé avec succès:', response);
          this.groupCreated.emit(); // Émet un événement pour informer le parent
         this.closePopup();// Ferme le popup et envoie la réponse
        },
        error: (error) => {
          console.error('Erreur lors de la création du groupe:', error);
          if (error.status === 400) {
            this.errorMessage = "Please enter a name and description related to the scientific field.";
          } else {
            this.errorMessage = "Une erreur est survenue. Veuillez réessayer.";
          }
        },
        
     });
   }
   // Réinitialise le formulaire
   resetForm(): void {
     this.groupData = {
       name: '',
       description: '',
       visibility: 'PUBLIC',
     };
     this.selectedFile = null;
   }


   closePopup(): void {
    this.dialogRef.close();
  }
   
 }














