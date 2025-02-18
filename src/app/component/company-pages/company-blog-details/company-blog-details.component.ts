import { Component, Input } from '@angular/core';

import { HeaderComponent } from '../../widgets/header/header.component';
import { TitleSectionComponent } from '../../widgets/title-section/title-section.component';
import { BlogFilterComponent } from '../company-blog/company-blog-section/blog-filter/blog-filter.component';
import { BlogCommentComponent } from './blog-comment/blog-comment.component';
import { detailPart } from '../../../shared/data/company-pages/company';
import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { DownloadComponent } from '../../widgets/download/download.component';
import { LoadingComponent } from '../../../shared/skeleton-loader/widgets/loading/loading.component';
import { FooterComponent } from '../../widgets/footer/footer.component';

import { blogTitle } from '../../../shared/interface/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-blog-details',
  standalone: true,
  imports: [HeaderComponent, TitleSectionComponent, BlogFilterComponent, LoadingComponent,
    BlogCommentComponent, FeatherIconComponent, DownloadComponent, FooterComponent],
  templateUrl: './company-blog-details.component.html',
  styleUrl: './company-blog-details.component.scss'
})

export class CompanyBlogDetailsComponent {

  public currentUrl: string;

  public title: blogTitle = {
    title: 'blog',
    pages: 'Library'
  }

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
  }

  public detailPart = detailPart;

  ngOnInit() {
    document.body.classList.add('bg-white');
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-white');
  }


}
