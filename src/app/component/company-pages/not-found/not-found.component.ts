import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { HeaderComponent } from '../../widgets/header/header.component';
import { TitleSectionComponent } from '../../widgets/title-section/title-section.component';
import { DownloadComponent } from '../../widgets/download/download.component';
import { LoadingComponent } from '../../../shared/skeleton-loader/widgets/loading/loading.component';
import { FooterComponent } from '../../widgets/footer/footer.component';

import { blogTitle } from '../../../shared/interface/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [HeaderComponent, TitleSectionComponent, DownloadComponent
    , FooterComponent, LoadingComponent, RouterModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})

export class NotFoundComponent {

  public currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
  }

  public title: blogTitle = {
    title: '404',
    pages: '404'
  }

  ngOnInit() {
    document.body.classList.add('bg-white');
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-white');
  }
}
