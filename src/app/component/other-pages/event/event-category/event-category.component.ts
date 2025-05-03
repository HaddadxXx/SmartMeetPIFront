<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';
import { FormsModule } from '@angular/forms'; // 👈 importe FormsModule

import { EventCategoryService } from '../../../../shared/services/event-category.service';
import { event } from '../../../../shared/interface/event';
=======
import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';

import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';

import { EventCategoryService } from '../../../../shared/services/event-category.service';
import { Event } from '../../../../shared/interface/event';
import { RouterLink } from '@angular/router';
>>>>>>> NEW_Event_Session

@Component({
  selector: 'app-event-category',
  templateUrl: './event-category.component.html',
  styleUrl: './event-category.component.scss',
<<<<<<< HEAD
  imports: [FeatherIconComponent,CarouselModule,CommonModule, FormsModule],
  standalone:true
})

export class EventCategoryComponent implements OnInit {

  name: string = '';
  description: string = '';
  date: string = '';
  budget: number = 0;
  submitted = false;
  serverErrors: any = {};
  contractId?: string; // optionnel
  eventCategory: any[] = [];
  event: any = {};  

  events: any[] = [];
  isEditing = false;
  editingId: number | null = null;
  offers: any[] = [];
  selectedEventId: string = '';
  selectedOfferId: string = '';
  showModal: boolean = false;


  constructor(private http: HttpClient, eventCategoryService: EventCategoryService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents() {
    this.http.get<any[]>('http://localhost:8084/api/events/all').subscribe({
      next: (data) => this.events = data,
      error: (err) => console.error('Erreur fetch events:', err)
    });
  }

  createOrUpdateEvent() {
    this.submitted = true;
    this.serverErrors = {};

    if (!this.name || !this.description || !this.date || !this.budget) return;

    const event = {
      name: this.name,
      description: this.description,
      budget: this.budget,
      
      date: this.date
    };

    if (this.isEditing && this.editingId !== null) {
      // Mise à jour
      this.http.put(`http://localhost:8084/api/events/update/${this.editingId}`, event).subscribe({
        next: () => {
          this.fetchEvents();
          this.clearForm();
        },
        error: (err) => {
          console.error('Erreur update:', err);
          this.serverErrors = err.error;
        }
      });
    } else {
      // Création
      this.http.post('http://localhost:8084/api/events/create', event).subscribe({
        next: () => {
          this.fetchEvents();
          this.clearForm();
        },
        error: (err) => {
          console.error('Erreur create:', err);
          this.serverErrors = err.error;
        }
      });
    }
  }

  deleteEvent(id: number) {
    if (confirm('Tu veux vraiment supprimer cet événement ?')) {
      this.http.delete(`http://localhost:8084/api/events/delete/${id}`).subscribe({
        next: () => this.fetchEvents(),
        error: (err) => console.error('Erreur delete:', err)
      });
    }
  }

  editEvent(event: any) {
    this.name = event.name;
    this.description = event.description;
    this.date = event.date;
    this.editingId = event.id;
    this.isEditing = true;
  }

  clearForm() {
    this.name = '';
    this.description = '';
    this.date = '';
    this.isEditing = false;
    this.editingId = null;
    this.submitted = false;
  }
  openAffectationModal(event: any) {
    this.selectedEventId = event.id;
    this.showModal = true;
  
    // Récupérer les offres de sponsoring
    this.http.get("http://localhost:8084/api/offers")
      .subscribe({
        next: (data: any) => {
          this.offers = data;
        },
        error: (err) => console.error("Erreur lors de la récupération des offres :", err)
      });
  }
  affecterEvenement() {
    if (!this.selectedEventId || !this.selectedOfferId) {
      alert("Veuillez sélectionner une offre !");
      return;
    }
    this.http.put(`http://localhost:8084/api/events/affecter-sponsoring/${this.selectedEventId}/${this.selectedOfferId}`, {}, { responseType: 'text' })

      .subscribe({
        next: () => {
          alert("Événement affecté à l'offre avec succès !");
          this.closeModal();
        },
        error: (error) => {
          console.error("Erreur lors de l'affectation :", error);
          alert("L'événement est déjà affecté à cette offre");
        }
      });
  }
  closeModal() {
    this.showModal = false;
    this.selectedEventId = '';
    this.selectedOfferId = '';
  }
  /*downloadContract(contractId: string) {
    const url = `http://localhost:8084/api/contracts/download/${contractId}`;
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors du téléchargement du contrat.');
        }
        return response.blob();
      })
      .then(blob => {
        const fileURL = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = `contract_${contractId}.pdf`;
        a.click();
      })
      .catch(error => {
        console.error("Erreur:", error);
        alert("Une erreur s'est produite pendant le téléchargement du contrat.");
      });
  }*/
      downloadContract(contractId: string) {
        const url = `http://localhost:8084/api/contracts/download/${contractId}`;
        window.open(url, '_blank');
      }
      
      }
      
  
=======
  imports: [FeatherIconComponent,CarouselModule,CommonModule , RouterLink],
  standalone:true
})

export class EventCategoryComponent {

  public eventCategoryList :Event[];

  public storyDataOptions = {
    loop: true,
    margin: 20,
    autoplay: false,
    autoplayTimeout: 1000,
    autoplayHoverPause: false,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      300: {
        items: 3,
      },
      1000: {
        items: 8,
      },
    },
  };

  constructor(public eventServices:EventCategoryService){}

  ngOnInit(){
    this.eventServices.eventCategory().subscribe(response =>{
       this.eventCategoryList = response.eventCategory;
    })
  }

}
>>>>>>> NEW_Event_Session
