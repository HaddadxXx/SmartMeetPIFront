import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';
import { chatUser, chatsUser } from '../../../../shared/data/others-pages/messenger';
import { ChatContentComponent } from './chat-content/chat-content.component';

@Component({
  selector: 'app-messenger-section',
  standalone: true,
  imports: [FeatherIconComponent, ChatContentComponent, CommonModule, RouterModule],
  templateUrl: './messenger-section.component.html',
  styleUrl: './messenger-section.component.scss'
})

export class MessengerSectionComponent {

  public chatUser = chatUser;
  public messageData: chatsUser;

  ngOnInit() {
    this.messageData = this.chatUser.filter(x => x.id === 1)[0]
  }

  changeData(user: number) {
    this.chatUser.forEach(data => {
      if (data.id === user) {
        this.messageData = data;
      }
    })
  }
}
