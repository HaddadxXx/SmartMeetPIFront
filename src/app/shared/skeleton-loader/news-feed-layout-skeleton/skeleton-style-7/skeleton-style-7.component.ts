import { Component } from '@angular/core';
import { StorySkeletonComponent } from '../../widgets/story-skeleton/story-skeleton.component';
import { ProfileBoxSkeletonComponent } from '../../widgets/profile-box-skeleton/profile-box-skeleton.component';
import { SuggestionBoxSkeletonComponent } from '../../widgets/suggestion-box-skeleton/suggestion-box-skeleton.component';
import { LikePageSkeletonComponent } from '../../widgets/like-page-skeleton/like-page-skeleton.component';
import { CreatePostSkeletonComponent } from '../../widgets/create-post-skeleton/create-post-skeleton.component';
import { BirthdayReminderSkeletonComponent } from '../../widgets/birthday-reminder-skeleton/birthday-reminder-skeleton.component';
import { GallerySectionSkeletonComponent } from '../../widgets/gallery-section-skeleton/gallery-section-skeleton.component';
import { PostPanelSkeletonComponent } from '../../widgets/post-panel-skeleton/post-panel-skeleton.component';
import { HeaderTwoSkeletonComponent } from '../../widgets/header/header-two-skeleton/header-two-skeleton.component';

@Component({
  selector: 'app-skeleton-style-7',
  standalone: true,
  imports: [StorySkeletonComponent,ProfileBoxSkeletonComponent,SuggestionBoxSkeletonComponent,
  LikePageSkeletonComponent,CreatePostSkeletonComponent,BirthdayReminderSkeletonComponent,
  GallerySectionSkeletonComponent,PostPanelSkeletonComponent,HeaderTwoSkeletonComponent],
  templateUrl: './skeleton-style-7.component.html',
  styleUrl: './skeleton-style-7.component.scss'
})
export class SkeletonStyle7Component {

}
