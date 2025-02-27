import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';

import { activityFeed } from '../../../../shared/data/profile-pages/activity-feed';
import { ClickOutSideDirective } from '../../../../shared/directives/click-out-side.directive';

@Component({
  selector: 'app-profile-activity-feed',
  standalone: true,
  imports: [FeatherIconComponent,CommonModule,ClickOutSideDirective],
  templateUrl: './profile-activity-feed.component.html',
  styleUrl: './profile-activity-feed.component.scss'
})

export class ProfileActivityFeedComponent {

  public activityFeed = activityFeed;
  public isShow: boolean = false;

  outSideClose(){
    this.isShow = false;
 }

}
