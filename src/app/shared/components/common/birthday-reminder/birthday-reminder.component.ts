import { Component } from '@angular/core';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';
import { ClickOutSideDirective } from '../../../directives/click-out-side.directive';

@Component({
  selector: 'app-birthday-reminder',
  templateUrl: './birthday-reminder.component.html',
  styleUrl: './birthday-reminder.component.scss',
  imports: [FeatherIconComponent,ClickOutSideDirective],
  standalone: true
})

export class BirthdayReminderComponent {

  public isShow: boolean = false;

  outSideClose() {
    this.isShow = false;
  }

}
