import { Component } from '@angular/core';
import { ConversationPanelSkeletonComponent } from '../../widgets/conversation-panel-skeleton/conversation-panel-skeleton.component';
import { HeaderOneSkeletonComponent } from '../../widgets/header/header-one-skeleton/header-one-skeleton.component';

@Component({
  selector: 'app-profile-activityfeed-skeleton',
  standalone: true,
  imports: [ConversationPanelSkeletonComponent,HeaderOneSkeletonComponent],
  templateUrl: './profile-activityfeed-skeleton.component.html',
  styleUrl: './profile-activityfeed-skeleton.component.scss'
})
export class ProfileActivityfeedSkeletonComponent { 

}
