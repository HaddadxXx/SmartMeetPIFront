import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Define the Transport interface
interface Transport {
  id: string;
  type: string;
  capacite: number;
  statut: string;
}

// Define the Event interface for assignments
interface Event {
  idEvent: string;
  nomEvent: string;
  dateDebut: string;
  dateFin: string;
}

interface Assignment {
  dateDebut: string;
  dateFin: string;
  event: Event;
}

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  constructor(private http: HttpClient) {}

  createTransport(data: Partial<Transport>): Observable<Transport> {
    return this.http.post<Transport>('http://localhost:8080/api/transports/create', data);
  }

  getAllTransports(): Observable<Transport[]> {
    return this.http.get<Transport[]>('http://localhost:8080/api/transports/all');
  }

  updateTransport(id: string, data: Partial<Transport>): Observable<Transport> {
    return this.http.put<Transport>(`http://localhost:8080/api/transports/update/${id}`, data);
  }

  deleteTransport(id: string): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/transports/delete/${id}`, { responseType: 'text' });
  }

  checkAvailability(transportId: string, dateDebut: string, dateFin: string): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/api/transports/check-availability/${transportId}/${dateDebut}/${dateFin}`);
  }

  affecterTransport(eventId: string, transportId: string): Observable<string> {
    return this.http.put(`http://localhost:8080/api/events/affecter-transport/${eventId}/${transportId}`, {}, { responseType: 'text' });
  }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>('http://localhost:8080/api/events/all');
  }

  getAssignments(transportId: string): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`http://localhost:8080/api/transports/assignments/${transportId}`);
  }
}