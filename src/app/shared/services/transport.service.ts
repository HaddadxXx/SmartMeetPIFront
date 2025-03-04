import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  private baseUrl = 'http://localhost:8087/api/transports';
  private eventUrl = 'http://localhost:8087/api/events';

  constructor(private http: HttpClient) {}

  getAllTransports(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  createTransport(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  updateTransport(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, data);
  }

  deleteTransport(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }

  // Récupérer la liste des événements
  getAllEvents(): Observable<any> {
    return this.http.get(`${this.eventUrl}/all`);
  }

  // Affecter un transport à un événement
  affecterTransport(eventId: string, transportId: string): Observable<string> {
    return this.http.put(`${this.eventUrl}/affecter-transport/${eventId}/${transportId}`, {}, { responseType: 'text' });
  }
}

