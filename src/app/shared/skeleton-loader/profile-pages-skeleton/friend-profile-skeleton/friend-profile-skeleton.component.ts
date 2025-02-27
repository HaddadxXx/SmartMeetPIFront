import { Component } from '@angular/core';
import { ConversationPanelSkeletonComponent } from '../../widgets/conversation-panel-skeleton/conversation-panel-skeleton.component';
import { SidebarOneSkeletonComponent } from '../../widgets/sidebar/sidebar-one-skeleton/sidebar-one-skeleton.component';
import { SuggestionBoxSkeletonComponent } from '../../widgets/suggestion-box-skeleton/suggestion-box-skeleton.component';
import { LikePageSkeletonComponent } from '../../widgets/like-page-skeleton/like-page-skeleton.component';
import { GallerySectionSkeletonComponent } from '../../widgets/gallery-section-skeleton/gallery-section-skeleton.component';
import { HeaderOneSkeletonComponent } from '../../widgets/header/header-one-skeleton/header-one-skeleton.component';

@Component({
  selector: 'app-friend-profile-skeleton',
  standalone: true,
  imports: [ConversationPanelSkeletonComponent,SidebarOneSkeletonComponent,HeaderOneSkeletonComponent,
    SuggestionBoxSkeletonComponent,LikePageSkeletonComponent,GallerySectionSkeletonComponent],
  templateUrl: './friend-profile-skeleton.component.html',
  styleUrl: './friend-profile-skeleton.component.scss'
})
export class FriendProfileSkeletonComponent {

}
