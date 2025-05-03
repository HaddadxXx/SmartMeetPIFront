import { Component, Input } from '@angular/core';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

import { ShareComponent } from '../../../modal/share/share.component';
import { FeatherIconComponent } from '../../feather-icon/feather-icon.component';
import { CommentDataComponent } from './comment-data/comment-data.component';

import { emojiList } from '../../../../data/common';
import { profile } from '../../../../interface/post';

import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { ClickOutSideDirective } from '../../../../directives/click-out-side.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-react',
  templateUrl: './post-react.component.html',
  styleUrl: './post-react.component.scss',
  imports: [FeatherIconComponent, CommentDataComponent, ClickOutSideDirective,
    NgbTooltip, CommentDataComponent, PickerComponent,FormsModule,ClickOutSideDirective],
  standalone: true
})

export class PostReactComponent {

  @Input() data: profile;
  public emojiList = emojiList;
  public isEmoji: boolean = false;
  public isShow: boolean = false;
  public chatText: string;
  public showEmojiPicker:boolean = false;

  constructor(public modalServices: NgbModal) { }

  share() {
    this.modalServices.open(ShareComponent, {
      centered: true
    })
  }

  toggle(item: profile) {
    item.active = !item.active;
  }

  close() {
    this.isEmoji = false;
  }

  addEmoji(event: { emoji: { native: any; }; }) {
    const text = `${event.emoji.native}`;
    this.chatText = text;
    this.showEmojiPicker = false;
  }

  public toggleEmojiPicker(){
    this.showEmojiPicker=!this.showEmojiPicker;
  }
}
