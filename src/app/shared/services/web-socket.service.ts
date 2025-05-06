import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import  SockJS from 'sockjs-client';
import { Subject } from 'rxjs';
import { Message } from './message.service';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: any;

  private messageSubjects: { [key: string]: Subject<any> } = {};
  constructor() {
    this.connect();
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      console.log('WebSocket connected');
    });
  }
 
// S'abonner à une conversation spécifique
subscribeToConversation(conversationId: string): Subject<any> {
  if (!this.messageSubjects[conversationId]) {
    this.messageSubjects[conversationId] = new Subject<any>();
    this.stompClient.subscribe(`/topic/messages/${conversationId}`, (message: any) => {
      this.messageSubjects[conversationId].next(JSON.parse(message.body));
    });
  }
  return this.messageSubjects[conversationId];
}

// Envoyer un message via WebSocket
sendMessage(message: Message) {
  this.stompClient.send('/app/sendMessage', {}, JSON.stringify(message));
}
isConnected(): boolean {
  return this.stompClient && this.stompClient.connected;
}
}