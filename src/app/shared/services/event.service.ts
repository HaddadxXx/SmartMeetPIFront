import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../../shared/interface/event';
//import { Session } from '../interface/Session';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';


@Injectable({
    providedIn: 'root',
    
  })
  export class EventService {
   /* getAllEvents() {
      throw new Error('Method not implemented.');
    }*/


  private apiUrl = 'http://localhost:8888/events';

  constructor(private http: HttpClient ,private authService : AuthService ,private userService : UserService) { }

   // Récupérer la liste des événements
  
    getAllEvents(): Observable<Event[]> {
      return this.http.get<Event[]>(`${this.apiUrl}/getAllEvents`);
    }

  
 


  createEvent(formData: FormData) {
    return this.http.post(`${this.apiUrl}/addEvenement`, formData);
  }
    
  // Mettre à jour un événement
  updateEvent(id: string, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event);
  }
  ajouterSessionEtAffecterAEvenement(sessionData: any, eventName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/ajouterSessionEtAffecterAEvenement/${encodeURIComponent(eventName)}`, sessionData);
  }
  
  getUserByOwnerEvent(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/current`);
  }
  
   // Supprimer un événement
   deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  
  // Récupérer les events paginés
  getPaginatedEvents(page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/paginated?page=${page}&size=${size}`);
  } 

  participateToEvent(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/participateToEvent`, formData);
  }
  
}