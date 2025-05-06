import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {
  private apiUrl = 'http://localhost:8080/api/friend-requests'; // URL de base du backend

  constructor(private http: HttpClient) { }

  // Récupérer les demandes d'amis en attente pour un utilisateur
  getPendingRequests(receiverId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pending/${receiverId}`);
  }

  // Répondre à une demande d'ami (accepter ou refuser)
  respondToRequest(requestId: string, status: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/respond`, null, { params: { requestId, status } });
  }
}