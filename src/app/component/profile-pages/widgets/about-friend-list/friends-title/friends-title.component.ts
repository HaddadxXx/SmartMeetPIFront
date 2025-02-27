import { Component } from '@angular/core';
import { FeatherIconComponent } from '../../../../../shared/components/common/feather-icon/feather-icon.component';
import { ClickOutSideDirective } from '../../../../../shared/directives/click-out-side.directive';

@Component({
  selector: 'app-friends-title',
  standalone: true,
  imports: [FeatherIconComponent,ClickOutSideDirective],
  templateUrl: './friends-title.component.html',
  styleUrl: './friends-title.component.scss'
})

export class FriendsTitleComponent {

  public isShow: boolean = false;

}
