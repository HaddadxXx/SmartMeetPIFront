import { Component } from '@angular/core';
import { ConversationPanelSkeletonComponent } from '../../widgets/conversation-panel-skeleton/conversation-panel-skeleton.component';
import { CreatePostSkeletonComponent } from '../../widgets/create-post-skeleton/create-post-skeleton.component';
import { LikePageSkeletonComponent } from '../../widgets/like-page-skeleton/like-page-skeleton.component';
import { SidebarThreeSkeletonComponent } from '../../widgets/sidebar/sidebar-three-skeleton/sidebar-three-skeleton.component';
import { StorySkeletonComponent } from '../../widgets/story-skeleton/story-skeleton.component';
import { BirthdayReminderSkeletonComponent } from '../../widgets/birthday-reminder-skeleton/birthday-reminder-skeleton.component';
import { GallerySectionSkeletonComponent } from '../../widgets/gallery-section-skeleton/gallery-section-skeleton.component';
import { PostPanelSkeletonComponent } from '../../widgets/post-panel-skeleton/post-panel-skeleton.component';
import { HeaderOneSkeletonComponent } from '../../widgets/header/header-one-skeleton/header-one-skeleton.component';

@Component({
  selector: 'app-skeleton-style-9',
  standalone: true,
  imports: [ConversationPanelSkeletonComponent,SidebarThreeSkeletonComponent,StorySkeletonComponent,
  LikePageSkeletonComponent,CreatePostSkeletonComponent,BirthdayReminderSkeletonComponent,
  GallerySectionSkeletonComponent,PostPanelSkeletonComponent,HeaderOneSkeletonComponent],
  templateUrl: './skeleton-style-9.component.html',
  styleUrl: './skeleton-style-9.component.scss'
})
export class SkeletonStyle9Component {

}
