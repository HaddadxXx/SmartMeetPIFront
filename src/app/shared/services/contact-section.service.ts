import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class ContactSectionService {

  private baseUrl = 'http://localhost:8084/api/offers';

  constructor(private http: HttpClient, public authService: AuthService) {}

  getAllOffers(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  createOffer(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  updateOffer(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteOffer(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

}
