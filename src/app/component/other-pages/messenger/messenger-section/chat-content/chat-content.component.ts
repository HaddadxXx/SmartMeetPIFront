import { CommonModule } from '@angular/common';
import { Component, Input,SimpleChanges } from '@angular/core';
import { FeatherIconComponent } from '../../../../../shared/components/common/feather-icon/feather-icon.component';
import { SvgIconComponent } from '../../../../../shared/components/common/svg-icon/svg-icon.component';
import {  chatsUser, socialMediaMessenger } from '../../../../../shared/data/others-pages/messenger';
import { UserInfoComponent } from './user-info/user-info.component';
import { MessageService,Message } from '../../../../../shared/services/message.service';
import { AuthService } from '../../../../../shared/services/auth.service';
import { WebSocketService } from '../../../../../shared/services/web-socket.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-chat-content',
  standalone: true,
  imports: [FeatherIconComponent, UserInfoComponent,SvgIconComponent, CommonModule],
  templateUrl: './chat-content.component.html',
  styleUrl: './chat-content.component.scss'
})

export class ChatContentComponent {

  @Input() data: chatsUser;
  @Input() conversationId: string;
  @Input() currentUserId!: string;

  public isShow: boolean = false;
  public isHide: boolean = false;
  public isMenu: boolean = false;
  public chats : Message[]=[];
  public socialMedia = socialMediaMessenger;
 private webSocketSubscription: Subscription | null = null; // Stocke l'abonnement actuel  // ① déclaration de la propriété


 
  constructor(private messageService: MessageService,private authService :AuthService,private webSocketService: WebSocketService) {}
 
  ngOnInit() {
    if (this.conversationId) {
      this.loadMessages();
      this.subscribeToWebSocket();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Angular appelle ça à chaque changement de l'input `conversationId`
    if (changes['conversationId'] && changes['conversationId'].currentValue) {
     // Désabonner l'abonnement précédent avant de créer un nouveau
     this.unsubscribeWebSocket();
     this.loadMessages();
     this.subscribeToWebSocket();
    }
  }


  private subscribeToWebSocket() {
    if (this.webSocketService.isConnected()) {
      this.webSocketSubscription = this.webSocketService
        .subscribeToConversation(this.conversationId)
        .subscribe((message: Message) => {
          if (!this.chats.some((m) => m.timestamp === message.timestamp && m.content === message.content)) {
            this.chats.push(message);
          }
        });
    } else {
      // Si le WebSocket n'est pas prêt, réessaie après un délai
      setTimeout(() => this.subscribeToWebSocket(), 500);
    }
  }

  private unsubscribeWebSocket() {
    if (this.webSocketSubscription) {
      this.webSocketSubscription.unsubscribe();
      this.webSocketSubscription = null; // Réinitialiser pour éviter les références obsolètes
    }
  }

 
  loadMessages() {
    this.chats = []; // Vider les messages avant de charger ceux de la nouvelle conversation
    this.messageService.getMessages(this.conversationId).subscribe((messages) => {
      this.chats = messages;
    });
  }

 
 sendMessage() {
    const textarea = document.querySelector('.message-input') as HTMLTextAreaElement;
    const msg = textarea.value.trim();
    if (!msg) return;

    const newMessage: Message = {
      conversationId: this.conversationId,
      content: msg,
      senderId: this.currentUserId, // injecte ton true ID plus tard
      timestamp: new Date().toISOString()
    };

    this.webSocketService.sendMessage(newMessage); // Envoi via WebSocket
  textarea.value = ''; // Réinitialise le champ de saisie
  }
  ngOnDestroy() {
    this.unsubscribeWebSocket(); // Désabonner lors de la destruction du composant
  }
 //////////////////////////
  getProfileImage(profilePicture: string | null): string {
    return profilePicture 
      ? `url('http://localhost:8080/uploads/${profilePicture}')` 
      : `url('http://localhost:8080/uploads/defaultuser.jpg')`;
  }

  
  receiveChildData(value: boolean) {
    this.isMenu = value;
  }
 
}
