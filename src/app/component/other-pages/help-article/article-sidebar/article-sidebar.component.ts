import { Component } from '@angular/core';
import { articleSidebar } from '../../../../shared/data/others-pages/others-pages';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';

@Component({
  selector: 'app-article-sidebar',
  standalone: true,
  imports: [FeatherIconComponent],
  templateUrl: './article-sidebar.component.html',
  styleUrl: './article-sidebar.component.scss'
})

export class ArticleSidebarComponent {

  public articleSidebar = articleSidebar ;

}
