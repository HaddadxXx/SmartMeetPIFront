import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../../shared/interface/event';

import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment';

// export interface Eveent {
//   id: string  ;
//   nomEvent: string;
//   date: string;
//   description: string;
//   name: string;
//   fans: number;
//   images: string;
// }

@Injectable({
  providedIn: 'root',
  
})
export class EventService {
  getAllEvents() {
    throw new Error('Method not implemented.');
  }
 // private apiUrl = `${environment.apiUrl}/events`; // Remplacez par l'URL de votre API
private apiUrl = 'http://localhost:8081/events';

  constructor(private http: HttpClient) {}

  // Récupérer la liste des événements
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/getAllEvents`);
  }

  // // Récupérer un événement par son ID
  // getEventById(id: number): Observable<Event> {
  //   return this.http.get<Event>(`${this.apiUrl}/${id}`);
  // }

  // Créer un nouvel événement
  // createEvent(event: Event): Observable<Event> {
  //   return this.http.post<Event>(`${this.apiUrl}/addEvenement`, event);
  // }
  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/addEvenement`, event, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  
  // Mettre à jour un événement
  updateEvent(id: string, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event);
  }

  // Supprimer un événement
  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  





}
