import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../../../shared/services/event.service';
import { CommonService } from '../../../../shared/services/common.service';
import { Router } from '@angular/router';
import { EventSkeletonComponent } from '../../../../shared/skeleton-loader/others-pages-skeleton/event-skeleton/event-skeleton.component';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../shared/interface/event';
import { User, UserService } from '../../../../shared/services/user.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { take, switchMap } from 'rxjs';
@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [EventSkeletonComponent,ReactiveFormsModule , CommonModule , FormsModule],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss'
})
export class AddEventComponent {
  selectedFile: File;
  cancel() {
    throw new Error('Method not implemented.');
    }
      eventForm: FormGroup;
      successMessage: string = '';
      errorMessage: string = '';
      eventTypes: string[] = ['ENLIGNE', ' PRESENTIEL'];
      isEditMode: any;
    
      eventId: string | undefined;
      owner: any = null;
        //    currentUserId!: string;
     
      constructor(private fb: FormBuilder, private eventService: EventService ,
        public commonServices: CommonService,private router: Router ,private userService: UserService,
      private authService : AuthService) {
        this.eventForm = this.fb.group({
          nomEvent: ['', Validators.required],
          description: ['', Validators.required],
          theme: ['', Validators.required],
          typeEvent: ['', Validators.required],
          dateDebut :['', Validators.required],
          dateFin  : ['', Validators.required],
          capacite : ['', Validators.required],
          horaire: ['', Validators.required],
          lieu: [{ value: '', disabled: true }], 
          
        
        });


        

      // Vérifier si on est en mode édition
      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras.state as { eventData?: Event };
      
      if (state?.eventData) {
          this.isEditMode = true;
          this.eventId = state.eventData.idEvent;
          this.eventForm.patchValue(state.eventData); // Remplir le formulaire avec les données existantes
         
      } else {
          this.isEditMode = false;
      }
      
  
        
      }
     
      
    
      
      onTypeChange() {
        const typeEvent = this.eventForm.controls['typeEvent'].value;
      
        if (typeEvent === 'PRESENTIEL') {
          this.eventForm.controls['lieu'].enable();
        } else {
          this.eventForm.controls['lieu'].disable();
          this.eventForm.controls['lieu'].setValue('');
        }
      
        console.log('Type Event:', typeEvent);
        console.log('Lieu Status:', this.eventForm.controls['lieu'].status); // ✅ Vérifier s'il est bien activé/désactivé
      }
      onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
      }
      
      ngOnInit() {
        this.authService.getCurrentUser().subscribe(
          (user) => {
            this.owner = user; // <- Sauvegarde l'utilisateur dans ton component
          },
          (error) => {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error);
          }
        );
      }
      

           

          

            
 

            onSubmit() {
              if (!this.owner) {
                console.error('Utilisateur non chargé.');
                return;
              }
              const formData = new FormData();
              const eventObject = this.eventForm.value;

               // ✨ Ajouter ici le userOwner à ton eventObject
               const ownerId = localStorage.getItem('userId');
               eventObject.ownerId = ownerId;
                  formData.append('event', new Blob([JSON.stringify(eventObject)], { type: 'application/json' }));

                  if (this.selectedFile) {
                    formData.append('file', this.selectedFile);
                  }

                  console.log('Formulaire envoyé :', eventObject);
                //  console.log('user owner :',Response);
                  
                this.eventService.createEvent(formData).subscribe({
                  next: (response) => {
                    console.log('Événement ajouté : ', response);
                    console.log('ID de l\'utilisateur propriétaire :',ownerId);
                    this.successMessage = 'Événement ajouté avec succès !';
                    setTimeout(() => {
                      this.router.navigate(['others/event-calendar']);
                    }, 1500);
                  },

                  error: (error) => {
                    console.error('Erreur lors de l\'ajout de l\'événement :', error);
                    this.errorMessage = 'Erreur lors de l\'ajout de l\'événement.';
                  }
            
  }  );
            
            
}
}