import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EventSkeletonComponent } from '../../../../shared/skeleton-loader/others-pages-skeleton/event-skeleton/event-skeleton.component';
import { EventService } from '../../../../shared/services/event.service';
import { CommonService } from '../../../../shared/services/common.service';
import { Router } from '@angular/router';
import { EventComponent } from '../event.component';
import { EventsComponent } from '../../../../shared/components/common/events/events.component';
import { Event } from '../../../../shared/interface/event';
@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,EventSkeletonComponent, FormsModule, EventComponent,EventsComponent],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss',
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

      // Ajout de la configuration du datepicker
    //   bsConfig: Partial<BsDatepickerConfig> = { 
    //   adaptivePosition: true, 
    //   showWeekNumbers: false,
    //   containerClass: 'theme-default',
    //   dateInputFormat: 'DD/MM/YYYY'
    //  };
     
      constructor(private fb: FormBuilder, private eventService: EventService ,public commonServices: CommonService,private router: Router) {
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
         // date: ['', Validators.required],
          
          
        });


        
        //mta3 el modif eli zedetou 
        // Récupérer l'événement passé via la 
        

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
     
      
    
      // onSubmit() {
      //   if (this.eventForm.valid) {
      //      console.log('Formulaire envoyé !', this.eventForm.value);
      //     const newEvent = {
      //       nomEvent: this.eventForm.value.nomEvent,
      //       description: this.eventForm.value.description,
      //       date: this.eventForm.value.date,
      //       dateDebut: this.eventForm.value.dateDebut,
      //       dateFin: this.eventForm.value.dateFin,
      //       fans: 0,
      //       images: this.eventForm.value.imageUrl || '',
      //       theme: this.eventForm.value.theme,
      //       typeEvent: this.eventForm.value.typeEvent,
      //       capacite : this.eventForm.value.capacite,
      //       name: ''

      //     } as Event;  // Force le type Event
          
      //     this.eventService.createEvent(newEvent).subscribe(
      //       (response) => {
      //         this.successMessage = 'Événement ajouté avec succès !';
      //         this.eventForm.reset();
      //       },
      //       (error) => {
      //         this.errorMessage = 'Échec de l’ajout de l’événement.';
      //       }
      //     );
      //   } else {
      //     this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      //   }

        
      // }
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
      
      

      onSubmit() {
        if (this.eventForm.valid) {
            console.log('Formulaire envoyé !', this.eventForm.value);
    
            const dateDebut = new Date(this.eventForm.value.dateDebut);
            const dateFin = new Date(this.eventForm.value.dateFin);
            
            // Vérifier que la date de fin n'est pas avant la date de début
            if (dateDebut > dateFin) {
                this.errorMessage = "La date de fin ne peut pas être avant la date de début.";
                console.error(this.errorMessage);
                return;
            }
           

            const eventData: Event = {
              idEvent: this.eventId,
              nomEvent: this.eventForm.value.nomEvent,
              description: this.eventForm.value.description,
              dateDebut: this.eventForm.value.dateDebut,
              dateFin: this.eventForm.value.dateFin,
              capacite: this.eventForm.value.capacite, // Vérifie que c'est la bonne valeur
              theme: this.eventForm.value.theme,
              typeEvent: this.eventForm.value.typeEvent,
              images: this.eventForm.value.imageUrl || '',
              horaire: this.eventForm.value.horaire,
              lieu: this.eventForm.value.lieu || '',
              fans: 0,
              name: '',
              isInterested: false,
             
            };

            
              
    
            if (this.isEditMode && this.eventId) {
                this.eventService.updateEvent(this.eventId, eventData).subscribe(
                    (response) => {
                        this.successMessage = 'Événement mis à jour avec succès !';
                        this.router.navigate(['/others/event-calendar']);
                    },
                    (error) => {
                        this.errorMessage = 'Échec de la modification de l’événement.';
                        console.error(error);
                    }
                );
            } else {
                this.eventService.createEvent(eventData ).subscribe(
                    (response) => {
                        this.successMessage = 'Événement ajouté avec succès !';
                        this.router.navigate(['/others/event-calendar']);
                    },
                    (error) => {
                        this.errorMessage = 'Échec de l’ajout de l’événement.';
                        console.error(error);
                    }
                );
                
            }
        } else {
            this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
        }


        


        
    }

    
    
      
    
      
  
      

}
