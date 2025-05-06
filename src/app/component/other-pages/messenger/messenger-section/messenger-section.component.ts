import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';
import { chatUser, chatsUser } from '../../../../shared/data/others-pages/messenger';
import { ChatContentComponent } from './chat-content/chat-content.component';
import { UserService } from '../../../../shared/services/user.service';
import { AuthService } from '../../../../shared/services/auth.service';
@Component({
  selector: 'app-messenger-section',
  standalone: true,
  imports: [FeatherIconComponent, ChatContentComponent, CommonModule, RouterModule],
  templateUrl: './messenger-section.component.html',
  styleUrl: './messenger-section.component.scss'
})

export class MessengerSectionComponent {

  public chatUser: chatsUser[] = [];
  public messageData: chatsUser;
  public currentUserId!: string;
  public selectedConversationId!: string;

  constructor(private userService: UserService,private authService:AuthService) {} 

  
  ngOnInit() {
    
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUserId = user.id;           
    });

    this.userService.getUsers().subscribe({
      next: (users) => {
        this.chatUser = users;
        console.log(users);
        if (users.length > 0) {
          this.messageData = users[0]; // premier utilisateur par défaut
           // Initialisation de la conversation sur le premier user
           this.selectedConversationId = this.generateConversationId(users[0].id);
           console.log("loel :",this.selectedConversationId)
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs', err);
      }
    });
  }

  changeData(userId: string) {
    const selectedUser = this.chatUser.find(data => data.id === userId);
    if (selectedUser) {
      this.messageData = selectedUser;
      console.log("il es", selectedUser)

      this.selectedConversationId = this.generateConversationId(userId);
console.log("l'id conv : ",this.selectedConversationId)
    }
  }




  private generateConversationId(selectedUserId: string): string {
    // Trie les IDs pour avoir toujours le même ordre, peu importe qui clique
    const ids = [this.currentUserId, selectedUserId].sort();
    return ids.join('-');   // ex. "123-456"
  }





  getProfileImage(profilePicture: string | null): string {
    return profilePicture 
      ? `url('http://localhost:8080/uploads/${profilePicture}')` 
      : `url('http://localhost:8080/uploads/defaultuser.jpg')`;
  }
}
