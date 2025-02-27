import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SvgIconComponent } from '../../../../../../shared/components/common/svg-icon/svg-icon.component';
import { chatsUser, socialMediaMessenger } from '../../../../../../shared/data/others-pages/messenger';
import { FeatherIconComponent } from '../../../../../../shared/components/common/feather-icon/feather-icon.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [SvgIconComponent,FeatherIconComponent,CommonModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})

export class UserInfoComponent {


  @Input() data: chatsUser;
  @Input() isMenu : boolean;
  @Output() move: EventEmitter<boolean> = new EventEmitter<boolean>();

  public socialMedia = socialMediaMessenger;


  isFalse(){
    this.isMenu = false;
    this.move.emit(this.isMenu);

  }
}
