import { CommonModule } from '@angular/common';
import { Component, Input,SimpleChanges } from '@angular/core';
import { FeatherIconComponent } from '../../../../../shared/components/common/feather-icon/feather-icon.component';
import { SvgIconComponent } from '../../../../../shared/components/common/svg-icon/svg-icon.component';
import {  chatsUser, socialMediaMessenger } from '../../../../../shared/data/others-pages/messenger';
import { UserInfoComponent } from './user-info/user-info.component';
import { MessageService,Message } from '../../../../../shared/services/message.service';
import { AuthService } from '../../../../../shared/services/auth.service';
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
  

  receiveChildData(value: boolean) {
    this.isMenu = value;
  }
 
  constructor(private messageService: MessageService,private authService :AuthService) {}
  ngOnChanges(changes: SimpleChanges): void {
    // Angular appelle ça à chaque changement de l'input `conversationId`
    if (changes['conversationId'] && changes['conversationId'].currentValue) {
      this.loadMessages();
    }
  }

 
  loadMessages() {
    this.messageService.getMessages(this.conversationId).subscribe(messages => {
      this.chats = messages;
      console.log("messaget",messages);
      console.log("ca change a chaque clique ?",this.conversationId)
    });
  }

  ngOnInit(): void {
    // Récupère l'utilisateur connecté dès l'initialisation

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

    this.messageService.sendMessage(newMessage)
      .subscribe(sent => {
        this.chats.push(sent);
        textarea.value = '';
      });
  }
 
 //////////////////////////
  getProfileImage(profilePicture: string | null): string {
    return profilePicture 
      ? `url('http://localhost:8080/uploads/${profilePicture}')` 
      : `url('http://localhost:8080/uploads/defaultuser.jpg')`;
  }
}
