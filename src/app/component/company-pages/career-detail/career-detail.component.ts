import { Component, Input } from '@angular/core';

import { DownloadComponent } from '../../widgets/download/download.component';
import { TitleSectionComponent } from '../../widgets/title-section/title-section.component';
import { HeaderComponent } from '../../widgets/header/header.component';
import { MarketingAnalystComponent } from './marketing-analyst/marketing-analyst.component';
import { LoadingComponent } from '../../../shared/skeleton-loader/widgets/loading/loading.component';

import { blogTitle } from '../../../shared/interface/common';
import { FooterComponent } from '../../widgets/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-career-detail',
  standalone: true,
  imports: [TitleSectionComponent, HeaderComponent, LoadingComponent,
    MarketingAnalystComponent, DownloadComponent, FooterComponent],
  templateUrl: './career-detail.component.html',
  styleUrl: './career-detail.component.scss'
})

export class CareerDetailComponent {

  public currentUrl: string;

  public title: blogTitle = {
    title: 'job Details',
    pages: 'job Openings'
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
