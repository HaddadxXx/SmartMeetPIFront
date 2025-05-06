// call.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CallRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: string;
  roomId: string | null;
  createdAt: string | null;
}

interface AcceptResponse {
  tokenTo: string;
  tokenFrom: string;
  roomId: string;
}

@Injectable({ providedIn: 'root' })
export class CallService {
  private base = '/api/calls';

  constructor(private http: HttpClient) {}

  // 1. Lancer un appel
  requestCall(fromUserId: string, toUserId: string): Observable<CallRequest> {
    return this.http.post<CallRequest>(`${this.base}/requests`, { fromUserId, toUserId });
  }

  // 2. Récupérer les appels en attente pour un user (receiver)
  getPending(userId: string): Observable<CallRequest[]> {
    return this.http.get<CallRequest[]>(`${this.base}/pending/${userId}`);
  }

  // 3. Accepter un appel
  acceptCall(requestId: string, userId: string): Observable<AcceptResponse> {
    return this.http.post<AcceptResponse>(`${this.base}/accept`, { requestId, userId });
  }
}
