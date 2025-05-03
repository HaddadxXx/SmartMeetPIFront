import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SponsorshipRequestService {
  private baseUrl = 'http://localhost:8084/api/requests';

  constructor(private http: HttpClient) { }

  createRequest(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  getAllRequests(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  updateRequest(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, data);
  }

  deleteRequest(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
  affecterSponsorRequest(eventId: string, requestId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/affecter-sponsor-request/${eventId}/${requestId}`, {});
  }
  
}