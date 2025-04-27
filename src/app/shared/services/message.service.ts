import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { chats } from '../../shared/data/others-pages/messenger';
export interface Message {
  id?: string;             
  conversationId: string;
  content: string;
  senderId: string;
  timestamp: string;
  isReply?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:8080/api/messages'; // Ajuste selon ton endpoint backend

  constructor(private http: HttpClient) {}

  // Récupérer les messages d’une conversation par ID
  getMessages(conversationId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/${conversationId}`);
  }

  // Envoyer un message (optionnel via HTTP, sinon via WebSocket)
  sendMessage(message: Message): Observable<any> {
    return this.http.post<any>(this.apiUrl, message);
  }
}