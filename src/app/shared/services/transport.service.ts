import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor(private http: HttpClient) { }

  createTransport(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/transports/create', data);
  }

  getAllTransports(): Observable<any> {
    return this.http.get('http://localhost:8080/api/transports/all');
  }

  updateTransport(id: string, data: any): Observable<any> {
    return this.http.put(`http://localhost:8080/api/transports/update/${id}`, data);
  }

  deleteTransport(id: string): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/transports/delete/${id}`);
  }

  checkAvailability(transportId: string, dateDebut: string, dateFin: string): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/api/transports/check-availability/${transportId}/${dateDebut}/${dateFin}`);
  }

  affecterTransport(eventId: string, transportId: string): Observable<string> {
    return this.http.put(`http://localhost:8080/api/events/affecter-transport/${eventId}/${transportId}`, {}, { responseType: 'text' });
  }

  getAllEvents(): Observable<any> {
    return this.http.get('http://localhost:8080/api/events/all');
  }

  getAssignments(transportId: string): Observable<any> {
    return this.http.get(`http://localhost:8080/api/transports/assignments/${transportId}`);
  }
}