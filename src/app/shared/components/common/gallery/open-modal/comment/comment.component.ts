import { Component } from '@angular/core';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ShareComponent } from '../../../../modal/share/share.component';
import { FeatherIconComponent } from '../../../feather-icon/feather-icon.component';
import { emojiList } from '../../../../../data/common';
import { CommentDataComponent } from '../../../posts/post-react/comment-data/comment-data.component';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [FeatherIconComponent,NgbTooltip,CommentDataComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})

export class CommentComponent {

  public isShow:boolean = false;
  public emojiList = emojiList;
  public isEmoji: boolean = false;
  public isActive: boolean = true;
  constructor(public modalServices :NgbModal){}

  share() {
    this.modalServices.open(ShareComponent, {
      centered: true
    })
  }

}
