import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonService } from '../../../services/common.service';

import { FeatherIconComponent } from '../feather-icon/feather-icon.component';
import { PopoverLoaderComponent } from '../popover-loader/popover-loader.component';

import { RouterModule } from '@angular/router';
import { ClickOutSideDirective } from '../../../directives/click-out-side.directive';
import { friendsList } from '../../../interface/common';
import { ChatBoxComponent } from './chat-box/chat-box.component';

@Component({
  selector: 'app-friends-conversation',
  standalone: true,
  imports: [FeatherIconComponent, PopoverLoaderComponent, 
    ChatBoxComponent,NgbModule, CommonModule,ClickOutSideDirective, RouterModule],
  templateUrl: './friends-conversation.component.html',
  styleUrl: './friends-conversation.component.scss'
})

export class FriendsConversationComponent {

  public friendsListData: friendsList[];
  public isCollapsed = false;
  public isCollapsed2 = false;
  public isShow: boolean = false;
  public isOpenSearch: boolean = false;

  constructor(public commonServices: CommonService) { }

  ngOnInit() {
    this.commonServices.friendsConversation().subscribe(Response => {
      if (Response) {
        this.friendsListData = Response.friendsConversationList;
      }
    })
  }

  outSideClose() {
    this.isShow = false;
  }

}
