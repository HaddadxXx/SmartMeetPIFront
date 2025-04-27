import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Session } from "../interface/Session";

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private apiUrl = 'http://localhost:8888/sessions'; // Remplace par l'URL correcte de ton backend

  constructor(private http: HttpClient) {}

  getAllSessions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllSessions`);
  }

  // Supprimer une session
  deleteSession(idSession: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idSession}`);
  }

  // Mettre à jour une session
  updateSession(idSession: string, session: Session): Observable<Session> {
    return this.http.put<Session>(`${this.apiUrl}/${idSession}`, session);
  }
}
