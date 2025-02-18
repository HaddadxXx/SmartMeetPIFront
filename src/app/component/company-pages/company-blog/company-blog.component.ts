import { Component, Input } from '@angular/core';

import { DownloadComponent } from '../../widgets/download/download.component';
import { HeaderComponent } from '../../widgets/header/header.component';
import { TitleSectionComponent } from '../../widgets/title-section/title-section.component';
import { CompanyBlogSectionComponent } from './company-blog-section/company-blog-section.component';
import { LoadingComponent } from '../../../shared/skeleton-loader/widgets/loading/loading.component';
import { FooterComponent } from '../../widgets/footer/footer.component';

import { blogTitle } from '../../../shared/interface/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-blog',
  standalone: true,
  imports: [HeaderComponent,TitleSectionComponent,CompanyBlogSectionComponent,
  DownloadComponent,FooterComponent,LoadingComponent],
  templateUrl: './company-blog.component.html',
  styleUrl: './company-blog.component.scss'
})

export class CompanyBlogComponent {

  public currentUrl : string;

  public title : blogTitle = {
    title: 'blog',
    pages: 'Library'
  }

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
  }

  ngOnInit() {
    document.body.classList.add('bg-white');
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-white');
  }

}
