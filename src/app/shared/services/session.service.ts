import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private apiUrl = 'http://localhost:8082/sessions'; // Remplace par l'URL correcte de ton backend

  constructor(private http: HttpClient) {}

  getAllSessions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllSessions`);
  }
}
