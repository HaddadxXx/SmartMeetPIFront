import { Component } from '@angular/core';
import { ConversationPanelSkeletonComponent } from '../../widgets/conversation-panel-skeleton/conversation-panel-skeleton.component';
import { HeaderOneSkeletonComponent } from '../../widgets/header/header-one-skeleton/header-one-skeleton.component';
import { SidebarOneSkeletonComponent } from '../../widgets/sidebar/sidebar-one-skeleton/sidebar-one-skeleton.component';

@Component({
  selector: 'app-profile-gallery-skeleton',
  standalone: true,
  imports: [ConversationPanelSkeletonComponent,HeaderOneSkeletonComponent,SidebarOneSkeletonComponent],
  templateUrl: './profile-gallery-skeleton.component.html',
  styleUrl: './profile-gallery-skeleton.component.scss'
})
export class ProfileGallerySkeletonComponent {

}
