import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the Ressource interface
interface Ressource {
  id: string;
  name: string;
  typeR: string;
  quantite: number;
  statutR: string;
  selected?: boolean;
}

// Define the Session interface for assignments
interface Session {
  idSession: string;
  titre: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class RessourceService {
  private baseUrl = 'http://localhost:8080/api/ressources';
  private sessionUrl = 'http://localhost:8080/api/sessions';

  constructor(private http: HttpClient) {}

  getAllRessources(): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(`${this.baseUrl}/all`);
  }

  createRessource(data: Ressource): Observable<Ressource> {
    return this.http.post<Ressource>(`${this.baseUrl}/create`, data);
  }

  updateRessource(id: string, data: Ressource): Observable<Ressource> {
    return this.http.put<Ressource>(`${this.baseUrl}/update/${id}`, data);
  }

  deleteRessource(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }

  getAllSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.sessionUrl}/all`);
  }

  affecterRessource(sessionId: string, ressourceId: string): Observable<string> {
    return this.http.put(`${this.sessionUrl}/affecter-ressource/${sessionId}/${ressourceId}`, {}, { responseType: 'text' });
  }

  getAssignments(ressourceId: string): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.sessionUrl}/by-ressource/${ressourceId}`);
  }

  checkAvailability(ressourceId: string, date: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check-availability/${ressourceId}/${date}`);
  }
}