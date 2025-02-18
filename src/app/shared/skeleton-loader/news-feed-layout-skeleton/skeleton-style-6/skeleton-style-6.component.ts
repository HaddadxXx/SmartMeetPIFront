import { Component } from '@angular/core';
import { ConversationPanelSkeletonComponent } from '../../widgets/conversation-panel-skeleton/conversation-panel-skeleton.component';
import { ProfileBoxSkeletonComponent } from '../../widgets/profile-box-skeleton/profile-box-skeleton.component';
import { SuggestionBoxSkeletonComponent } from '../../widgets/suggestion-box-skeleton/suggestion-box-skeleton.component';
import { LikePageSkeletonComponent } from '../../widgets/like-page-skeleton/like-page-skeleton.component';
import { CreatePostSkeletonComponent } from '../../widgets/create-post-skeleton/create-post-skeleton.component';
import { StorySkeletonComponent } from '../../widgets/story-skeleton/story-skeleton.component';
import { PostPanelSkeletonComponent } from '../../widgets/post-panel-skeleton/post-panel-skeleton.component';
import { HeaderTwoSkeletonComponent } from '../../widgets/header/header-two-skeleton/header-two-skeleton.component';

@Component({
  selector: 'app-skeleton-style-6',
  standalone: true,
  imports: [ConversationPanelSkeletonComponent,ProfileBoxSkeletonComponent,SuggestionBoxSkeletonComponent,
  LikePageSkeletonComponent,CreatePostSkeletonComponent,StorySkeletonComponent,PostPanelSkeletonComponent,
  HeaderTwoSkeletonComponent],
  templateUrl: './skeleton-style-6.component.html',
  styleUrl: './skeleton-style-6.component.scss'
})
export class SkeletonStyle6Component {

}
