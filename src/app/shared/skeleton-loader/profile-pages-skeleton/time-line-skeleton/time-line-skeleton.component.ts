import { Component } from '@angular/core';
import { ConversationPanelSkeletonComponent } from '../../widgets/conversation-panel-skeleton/conversation-panel-skeleton.component';
import { SuggestionBoxSkeletonComponent } from '../../widgets/suggestion-box-skeleton/suggestion-box-skeleton.component';
import { CreatePostSkeletonComponent } from '../../widgets/create-post-skeleton/create-post-skeleton.component';
import { LikePageSkeletonComponent } from '../../widgets/like-page-skeleton/like-page-skeleton.component';
import { BirthdayReminderSkeletonComponent } from '../../widgets/birthday-reminder-skeleton/birthday-reminder-skeleton.component';
import { GallerySectionSkeletonComponent } from '../../widgets/gallery-section-skeleton/gallery-section-skeleton.component';
import { PostPanelSkeletonComponent } from '../../widgets/post-panel-skeleton/post-panel-skeleton.component';
import { HeaderOneSkeletonComponent } from '../../widgets/header/header-one-skeleton/header-one-skeleton.component';
import { SidebarOneSkeletonComponent } from '../../widgets/sidebar/sidebar-one-skeleton/sidebar-one-skeleton.component';

@Component({
  selector: 'app-time-line-skeleton',
  standalone: true,
  imports: [ConversationPanelSkeletonComponent,SuggestionBoxSkeletonComponent,SidebarOneSkeletonComponent,
    CreatePostSkeletonComponent,LikePageSkeletonComponent,BirthdayReminderSkeletonComponent,
    GallerySectionSkeletonComponent,PostPanelSkeletonComponent,HeaderOneSkeletonComponent],
  templateUrl: './time-line-skeleton.component.html',
  styleUrl: './time-line-skeleton.component.scss'
})
export class TimeLineSkeletonComponent {

}
