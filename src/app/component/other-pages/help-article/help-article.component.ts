import { Component } from '@angular/core';

import { HeaderOneComponent } from '../../../shared/components/common/header/header-one/header-one.component';
import { AnimationEmojiComponent } from '../../widgets/animation-emoji/animation-emoji.component';
import { ArticlePartComponent } from './article-part/article-part.component';
import { ArticleSidebarComponent } from './article-sidebar/article-sidebar.component';
import { DownloadComponent } from '../../widgets/download/download.component';
import { LoadingComponent } from '../../../shared/skeleton-loader/widgets/loading/loading.component';
import { FooterComponent } from '../../widgets/footer/footer.component';

@Component({
  selector: 'app-help-article',
  standalone: true,
  imports: [HeaderOneComponent,AnimationEmojiComponent,ArticlePartComponent,
  ArticleSidebarComponent,LoadingComponent,DownloadComponent,FooterComponent],
  templateUrl: './help-article.component.html',
  styleUrl: './help-article.component.scss'
})

export class HelpArticleComponent {

  ngOnInit() {
    document.body.classList.add('bg-white');
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-white');
  }

}
