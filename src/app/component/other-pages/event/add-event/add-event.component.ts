import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  cancel() {
    throw new Error('Method not implemented.');
    }
      eventForm: FormGroup;
      successMessage: string = '';
      errorMessage: string = '';
      eventTypes: string[] = ['ENLIGNE', ' PRESENTIEL'];
     isEditMode: any;
    
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
          //dateDebut :['', Validators.required],
          //dateFin  : ['', Validators.required],
          capacite : ['', Validators.required],
         // date: ['', Validators.required],
          
          
        });
        
      }
    
      onSubmit() {
        if (this.eventForm.valid) {
           console.log('Formulaire envoyé !', this.eventForm.value);
          const newEvent = {
            nomEvent: this.eventForm.value.nomEvent,
            description: this.eventForm.value.description,
            date: this.eventForm.value.date,
           // dateDebut: this.eventForm.value.dateDebut,
           // dateFin: this.eventForm.value.dateFin,
            fans: 0,
            images: this.eventForm.value.imageUrl || '',
            theme: this.eventForm.value.theme,
            typeEvent: this.eventForm.value.typeEvent,
            capacite : this.eventForm.value.capacite,
            name: ''

          } as Event;  // Force le type Event
          
          this.eventService.createEvent(newEvent).subscribe(
            (response) => {
              this.successMessage = 'Événement ajouté avec succès !';
              this.eventForm.reset();
            },
            (error) => {
              this.errorMessage = 'Échec de l’ajout de l’événement.';
            }
          );
        } else {
          this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
        }

        
      }

      

}
