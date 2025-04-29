// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class TransportService {

//   private baseUrl = 'http://localhost:8080/api/transports';
//   private eventUrl = 'http://localhost:8080/api/events';

//   constructor(private http: HttpClient) {}

//   private getHeaders(): HttpHeaders {
//     const token = localStorage.getItem('token');
//     let headers = new HttpHeaders({
//       'Content-Type': 'application/json'
//     });

//     // Only add the Authorization header if the token exists and is not null
//     if (token) {
//       headers = headers.set('Authorization', `Bearer ${token}`);
//     }

//     return headers;
//   }

//   getAllTransports(): Observable<any> {
//     return this.http.get(`${this.baseUrl}/all`, { headers: this.getHeaders() });
//   }

//   createTransport(data: any): Observable<any> {
//     return this.http.post(`${this.baseUrl}/create`, data, { headers: this.getHeaders() });
//   }

//   updateTransport(id: string, data: any): Observable<any> {
//     return this.http.put(`${this.baseUrl}/update/${id}`, data, { headers: this.getHeaders() });
//   }

//   deleteTransport(id: string): Observable<any> {
//     return this.http.delete(`${this.baseUrl}/delete/${id}`, { headers: this.getHeaders(), responseType: 'text' });
//   }

//   getAllEvents(): Observable<any> {
//     return this.http.get(`${this.eventUrl}/all`, { headers: this.getHeaders() });
//   }

//   affecterTransport(eventId: string, transportId: string): Observable<string> {
//     return this.http.put(`${this.eventUrl}/affecter-transport/${eventId}/${transportId}`, {}, { headers: this.getHeaders(), responseType: 'text' });
//   }

//   checkAvailability(transportId: string, date: string): Observable<boolean> {
//     return this.http.get<boolean>(`${this.baseUrl}/${transportId}/availability?date=${date}`, { headers: this.getHeaders() });
//   }

//   getAssignments(transportId: string): Observable<any[]> {
//     return this.http.get<any[]>(`${this.baseUrl}/${transportId}/assignments`, { headers: this.getHeaders() });
//   }
// }
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