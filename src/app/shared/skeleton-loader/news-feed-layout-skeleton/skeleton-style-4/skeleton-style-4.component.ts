import { Component } from '@angular/core';
import { SidebarTwoSkeletonComponent } from '../../widgets/sidebar/sidebar-two-skeleton/sidebar-two-skeleton.component';
import { StorySkeletonComponent } from '../../widgets/story-skeleton/story-skeleton.component';
import { ProfileBoxSkeletonComponent } from '../../widgets/profile-box-skeleton/profile-box-skeleton.component';
import { SuggestionBoxSkeletonComponent } from '../../widgets/suggestion-box-skeleton/suggestion-box-skeleton.component';
import { LikePageSkeletonComponent } from '../../widgets/like-page-skeleton/like-page-skeleton.component';
import { CreatePostSkeletonComponent } from '../../widgets/create-post-skeleton/create-post-skeleton.component';
import { BirthdayReminderSkeletonComponent } from '../../widgets/birthday-reminder-skeleton/birthday-reminder-skeleton.component';
import { GallerySectionSkeletonComponent } from '../../widgets/gallery-section-skeleton/gallery-section-skeleton.component';
import { PostPanelSkeletonComponent } from '../../widgets/post-panel-skeleton/post-panel-skeleton.component';
import { HeaderOneSkeletonComponent } from '../../widgets/header/header-one-skeleton/header-one-skeleton.component';

@Component({
  selector: 'app-skeleton-style-4',
  standalone: true,
  imports: [SidebarTwoSkeletonComponent,StorySkeletonComponent,ProfileBoxSkeletonComponent,
  SuggestionBoxSkeletonComponent,LikePageSkeletonComponent,CreatePostSkeletonComponent,
  BirthdayReminderSkeletonComponent,GallerySectionSkeletonComponent,PostPanelSkeletonComponent,
  HeaderOneSkeletonComponent],
  templateUrl: './skeleton-style-4.component.html',
  styleUrl: './skeleton-style-4.component.scss'
})
export class SkeletonStyle4Component {

}
