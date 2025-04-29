import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Event {
  id: string;
  name: string;
  typeE: string;
  dateE: string;
  lieu: string;
}

export interface Inscription {
  id: string;
  user: User | null; // Allow null to match backend reality
  event: Event | null; // Allow null to match backend reality
  dateInscription: string;
}

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private apiUrl = 'http://localhost:8080/api/inscriptions';

  constructor(private http: HttpClient) {}

  registerForEvent(userId: string, eventId: string): Observable<Inscription> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    const body = { userId, eventId };
    return this.http.post<Inscription>(this.apiUrl, body, { headers });
  }

  getQRCode(inscriptionId: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${this.apiUrl}/${inscriptionId}/qrcode`, { headers, responseType: 'blob' });
  }

  verifyInscription(inscriptionId: string): Observable<Inscription> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<Inscription>(`${this.apiUrl}/verify/${inscriptionId}`, { headers });
  }
}