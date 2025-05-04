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
import { VoiceRecognitionService } from '../../../../shared/services/voice-recognition.service';
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
      eventTypes: string[] = ['ONLINE', ' ON SITE'];
      isEditMode: any;
      eventId?: string; // Déclaré comme string | undefined
   //   eventId: string | undefined;
      owner: any = null;
        //    currentUserId!: string;
        isRecording = false;






      constructor(private fb: FormBuilder, private eventService: EventService ,private voiceService : VoiceRecognitionService,
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
      this.initializeEditMode(state.eventData);
    }
  }

  private initializeEditMode(eventData: Event): void {
    this.isEditMode = true;
    this.eventId = eventData.idEvent; // Simple assignation
    
    // Formatage des dates pour l'input
    const formattedEventData = {
      ...eventData,
      dateDebut: this.formatDateForInput(eventData.dateDebut),
      dateFin: this.formatDateForInput(eventData.dateFin)
    };

    this.eventForm.patchValue(formattedEventData);
    this.onTypeChange(); // Pour gérer l'état du champ lieu
  
        
      }
     
      
      private formatDateForInput(dateString: string): string {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
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
      
      startVoice() {
        this.voiceService.startListening(this.eventForm); // eventForm: FormGroup
      }
      
      stopVoice() {
        this.voiceService.stopListening();
      }

   onSubmit() {
        if (!this.owner) {
          console.error('Utilisateur non chargé.');
          return;
        }
    
        if (this.eventForm.invalid) {
          this.markAllAsTouched();
          return;
        }
    
        const formData = new FormData();
        const eventObject = this.eventForm.value;
        const ownerId = localStorage.getItem('userId');
    
        if (ownerId) {
          eventObject.ownerId = ownerId;
        }
    
        formData.append('event', new Blob([JSON.stringify(eventObject)], { 
          type: 'application/json' 
        }));
    
        if (this.selectedFile) {
          formData.append('file', this.selectedFile);
        }
    
        if (this.isEditMode && this.eventId) {
          this.updateEvent(formData);
        } else {
          this.createEvent(formData);
        }
      }
    
      private createEvent(formData: FormData) {
        this.eventService.createEvent(formData).subscribe({
          next: (response) => {
            this.handleSuccess('Événement créé avec succès !');
          },
          error: (error) => {
            this.handleError('Erreur lors de la création de l\'événement', error);
          }
        });
      }
    
      private updateEvent(formData: FormData) {
        if (!this.eventId || typeof this.eventId !== 'string') {
          this.errorMessage = 'ID événement invalide - impossible de mettre à jour';
          console.error('Erreur: eventId est invalide', this.eventId);
          return;
        }
      
        const eventId: string = this.eventId;
      
        // 1. Récupérer l'événement existant
        this.eventService.getEventById(eventId).subscribe({
          next: (existingEvent) => {
            // 2. Préparer les données de mise à jour
            const updateData = new FormData();
            const eventData = {
              ...this.eventForm.value,
              idEvent: eventId,
              ownerId: this.owner?.id || localStorage.getItem('userId') || '',
              // Ne pas écraser la photo existante si aucun nouveau fichier n'est sélectionné
              photo: this.selectedFile ? undefined : existingEvent.photo,
              sessions: existingEvent.sessions || [],
              participations: existingEvent.participations || [],
              nbParticipations: existingEvent.nbParticipations,
              tendanceRank: existingEvent.tendanceRank,
              pourcentageParticipation: existingEvent.pourcentageParticipation
            };
      
            updateData.append('event', new Blob([JSON.stringify(eventData)], {
              type: 'application/json'
            }));
      
            // Ajouter le fichier seulement s'il est sélectionné
            if (this.selectedFile) {
              updateData.append('file', this.selectedFile);
            }
      
            // 3. Envoyer la mise à jour
            this.eventService.updateEvent(eventId, updateData).subscribe({
              next: (updatedEvent) => {
                this.handleSuccess('Événement mis à jour avec succès !');
              },
              error: (error) => {
                this.handleError('Erreur lors de la mise à jour', error);
              }
            });
          },
          error: (error) => {
            console.error('Erreur lors de la récupération de l\'événement', error);
            this.errorMessage = 'Impossible de charger les données de l\'événement';
          }
        });
      }
    
      private handleSuccess(message: string) {
        this.successMessage = message;
        setTimeout(() => {
          this.router.navigate(['others/event-calendar']);
        }, 1500);
      }
    
      private handleError(message: string, error: any) {
        console.error(`${message}:`, error);
        this.errorMessage = message;
      }
    
      private markAllAsTouched() {
        Object.values(this.eventForm.controls).forEach(control => {
          control.markAsTouched();
        });
      }
    
      // cancel() {
      //   this.router.navigate(['others/event-calendar']);
      // }
    }
