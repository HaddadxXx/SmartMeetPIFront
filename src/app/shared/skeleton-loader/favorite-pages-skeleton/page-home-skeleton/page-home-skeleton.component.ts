import { Component } from '@angular/core';
import { ConversationPanelSkeletonComponent } from '../../widgets/conversation-panel-skeleton/conversation-panel-skeleton.component';
import { SidebarOneSkeletonComponent } from '../../widgets/sidebar/sidebar-one-skeleton/sidebar-one-skeleton.component';
import { LikePageSkeletonComponent } from '../../widgets/like-page-skeleton/like-page-skeleton.component';
import { GallerySectionSkeletonComponent } from '../../widgets/gallery-section-skeleton/gallery-section-skeleton.component';
import { PostPanelSkeletonComponent } from '../../widgets/post-panel-skeleton/post-panel-skeleton.component';
import { ProfileBoxSkeletonComponent } from '../../widgets/profile-box-skeleton/profile-box-skeleton.component';
import { HeaderOneSkeletonComponent } from '../../widgets/header/header-one-skeleton/header-one-skeleton.component';

@Component({
  selector: 'app-page-home-skeleton',
  standalone: true,
  imports: [ConversationPanelSkeletonComponent,SidebarOneSkeletonComponent,LikePageSkeletonComponent,
    GallerySectionSkeletonComponent,PostPanelSkeletonComponent,ProfileBoxSkeletonComponent,HeaderOneSkeletonComponent],
  templateUrl: './page-home-skeleton.component.html',
  styleUrl: './page-home-skeleton.component.scss'
})
export class PageHomeSkeletonComponent {

}
