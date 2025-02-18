import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FeatherIconComponent } from '../../../../../shared/components/common/feather-icon/feather-icon.component';
import { SvgIconComponent } from '../../../../../shared/components/common/svg-icon/svg-icon.component';
import { chat, chatsUser, socialMediaMessenger } from '../../../../../shared/data/others-pages/messenger';
import { UserInfoComponent } from './user-info/user-info.component';

@Component({
  selector: 'app-chat-content',
  standalone: true,
  imports: [FeatherIconComponent, UserInfoComponent,SvgIconComponent, CommonModule],
  templateUrl: './chat-content.component.html',
  styleUrl: './chat-content.component.scss'
})

export class ChatContentComponent {

  @Input() data: chatsUser;
  public isShow: boolean = false;
  public isHide: boolean = false;
  public isMenu: boolean = false;
  public chats = chat;
  public socialMedia = socialMediaMessenger;

  receiveChildData(value: boolean) {
    this.isMenu = value;
  }

}
