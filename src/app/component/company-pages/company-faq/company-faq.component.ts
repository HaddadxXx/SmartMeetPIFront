import { Component, Input } from '@angular/core';

import { blogTitle } from '../../../shared/interface/common';

import { DownloadComponent } from '../../widgets/download/download.component';
import { TitleSectionComponent } from '../../widgets/title-section/title-section.component';
import { HeaderComponent } from '../../widgets/header/header.component';
import { FaqSectionComponent } from './faq-section/faq-section.component';
import { LoadingComponent } from '../../../shared/skeleton-loader/widgets/loading/loading.component';
import { FooterComponent } from '../../widgets/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-faq',
  standalone: true,
  imports: [HeaderComponent,TitleSectionComponent,LoadingComponent,
    FaqSectionComponent, DownloadComponent, FooterComponent],
  templateUrl: './company-faq.component.html',
  styleUrl: './company-faq.component.scss'
})

export class CompanyFAQComponent {

  public currentUrl : string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
  }

  public title: blogTitle = {
    title: 'FAQ',
    pages: 'FAQ'
  }

  ngOnInit() {
    document.body.classList.add('bg-white');
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-white');
  }

}
