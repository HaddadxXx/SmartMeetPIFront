import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import  SockJS from 'sockjs-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: any;
  private messageSubject = new Subject<any>();

  constructor() {
    this.connect();
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/ws'); //
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/messages', (message: any) => {
        this.messageSubject.next(JSON.parse(message.body));
      });
    });
  }

  sendMessage(message: any) {
    this.stompClient.send('/app/sendMessage', {}, JSON.stringify(message));
  }

  getMessages(): Subject<any> {
    return this.messageSubject;
  }
}