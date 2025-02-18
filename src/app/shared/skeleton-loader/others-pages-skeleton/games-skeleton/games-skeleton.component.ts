import { Component } from '@angular/core';
import { ConversationPanelSkeletonComponent } from '../../widgets/conversation-panel-skeleton/conversation-panel-skeleton.component';
import { SidebarOneSkeletonComponent } from '../../widgets/sidebar/sidebar-one-skeleton/sidebar-one-skeleton.component';
import { HeaderOneSkeletonComponent } from '../../widgets/header/header-one-skeleton/header-one-skeleton.component';

@Component({
  selector: 'app-games-skeleton',
  standalone: true,
  imports: [ConversationPanelSkeletonComponent,SidebarOneSkeletonComponent,HeaderOneSkeletonComponent],
  templateUrl: './games-skeleton.component.html',
  styleUrl: './games-skeleton.component.scss'
})
export class GamesSkeletonComponent {

}
