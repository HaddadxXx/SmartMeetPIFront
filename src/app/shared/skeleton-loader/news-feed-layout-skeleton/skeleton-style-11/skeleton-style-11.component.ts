import { Component } from '@angular/core';
import { ConversationPanelSkeletonComponent } from '../../widgets/conversation-panel-skeleton/conversation-panel-skeleton.component';
import { StorySkeletonComponent } from '../../widgets/story-skeleton/story-skeleton.component';
import { CreatePostSkeletonComponent } from '../../widgets/create-post-skeleton/create-post-skeleton.component';
import { PostPanelSkeletonComponent } from '../../widgets/post-panel-skeleton/post-panel-skeleton.component';
import { HeaderOneSkeletonComponent } from '../../widgets/header/header-one-skeleton/header-one-skeleton.component';

@Component({
  selector: 'app-skeleton-style-11',
  standalone: true,
  imports: [ConversationPanelSkeletonComponent,StorySkeletonComponent,
    CreatePostSkeletonComponent,PostPanelSkeletonComponent,HeaderOneSkeletonComponent],
  templateUrl: './skeleton-style-11.component.html',
  styleUrl: './skeleton-style-11.component.scss'
})
export class SkeletonStyle11Component {

}
