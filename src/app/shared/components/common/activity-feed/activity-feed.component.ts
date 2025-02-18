import { Component } from '@angular/core';
import { activityFeed } from '../../../data/common';
import { CommonModule } from '@angular/common';
import { FeatherIconComponent } from '../feather-icon/feather-icon.component';
import { ClickOutSideDirective } from '../../../directives/click-out-side.directive';

@Component({
  selector: 'app-activity-feed',
  standalone: true,
  imports: [FeatherIconComponent, CommonModule,ClickOutSideDirective],
  templateUrl: './activity-feed.component.html',
  styleUrl: './activity-feed.component.scss'
})

export class ActivityFeedComponent {

  public activityFeed = activityFeed;
  public isShow: boolean = false;

  outSideClose(){
    this.isShow = false;
  }

}
