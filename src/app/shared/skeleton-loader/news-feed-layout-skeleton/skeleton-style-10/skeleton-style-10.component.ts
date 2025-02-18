import { Component } from '@angular/core';
import { ConversationPanelSkeletonComponent } from '../../widgets/conversation-panel-skeleton/conversation-panel-skeleton.component';
import { SidebarTwoSkeletonComponent } from '../../widgets/sidebar/sidebar-two-skeleton/sidebar-two-skeleton.component';
import { CreatePostSkeletonComponent } from '../../widgets/create-post-skeleton/create-post-skeleton.component';
import { PostPanelSkeletonComponent } from '../../widgets/post-panel-skeleton/post-panel-skeleton.component';
import { HeaderOneSkeletonComponent } from '../../widgets/header/header-one-skeleton/header-one-skeleton.component';

@Component({
  selector: 'app-skeleton-style-10',
  standalone: true,
  imports: [ConversationPanelSkeletonComponent,SidebarTwoSkeletonComponent,
    CreatePostSkeletonComponent,PostPanelSkeletonComponent,HeaderOneSkeletonComponent],
  templateUrl: './skeleton-style-10.component.html',
  styleUrl: './skeleton-style-10.component.scss'
})
export class SkeletonStyle10Component {

}
