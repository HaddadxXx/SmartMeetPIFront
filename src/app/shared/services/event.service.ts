import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../../shared/interface/event';
//import { Session } from '../interface/Session';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
interface MeetResponse {
 // link: string;
  message: string;
  meetLink: string;
}

@Injectable({
    providedIn: 'root',
    
  })
  export class EventService {
   /* getAllEvents() {
      throw new Error('Method not implemented.');
    }*/


  private apiUrl = 'http://localhost:8889/events';
  userId: any;

  constructor(private http: HttpClient ,private authService : AuthService ,private userService : UserService) { }

  
  
   // Récupérer la liste des événements
   getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/getAllEvents`);
  }

  
 
  
  
  lancerMeetPourEvent(eventId: string): Observable<MeetResponse> {
    return this.http.post<MeetResponse>(`http://localhost:8889/events/lancerMeetPourEvent/${eventId}`, {});
  }
  createEvent(formData: FormData) {
    return this.http.post(`${this.apiUrl}/addEvenement`, formData , { withCredentials: true });
  }
    
  updateEvent(id: string, formData: FormData): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, formData);
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

  

  sendEmailToParticipants(eventId: string) {
    return this.http.get(`${this.apiUrl}/testSend/${eventId}`, { responseType: 'text' });
  }
  

  analyzeFileWithAI(file: File, theme: string) {
    // Créer un FormData pour envoyer le fichier et le thème
    const formData = new FormData();
    formData.append('file', file);
    formData.append('theme', theme);
  
    // Faire une requête HTTP POST vers le backend Spring Boot
    return this.http.post<any>('http://localhost:8889/events/analyze', formData);
  }

  getEvenementTendance(): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/evenement-tendance`);
  }

   // Récupérer l'utilisateur connecté
   getCurrentUser(): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/getCurrentUser`);
  }
  

  verifierEtatEvenement(eventId: string) {
    return this.http.post(`${this.apiUrl}/verifier-etat/${eventId}`, null, {
      responseType: 'text'
    });
  }
  getTopTrendingEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/tendance`);
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/getEventById/${id}`);
}

getParticipantsEmailsByEventId(eventId: string): Observable<string[]> {
  return this.http.get<string[]>(`${this.apiUrl}/participants-emails/${eventId}`);
}


getEventsByOwnerId(email: string): Observable<Event[]> {
  console.log("Requête pour récupérer les événements pour l'email:", email);
  return this.http.get<Event[]>(`${this.apiUrl}?email=${email}`,  { withCredentials: true }).pipe(
    tap((response) => {
      console.log("Réponse du backend:", response); // Ajoute un log ici
    })
  );
}

}