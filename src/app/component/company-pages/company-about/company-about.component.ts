import { Component, Input, input } from '@angular/core';
import { BrandLogoComponent } from '../../../shared/components/common/header/widgets/brand-logo/brand-logo.component';
import { blogTitle } from '../../../shared/interface/common';
import { DownloadComponent } from '../../widgets/download/download.component';
import { HeaderComponent } from '../../widgets/header/header.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FeatureSectionComponent } from './feature-section/feature-section.component';
import { TeamSectionComponent } from './team-section/team-section.component';
import { TitleSectionComponent } from '../../widgets/title-section/title-section.component';
import { BlogSectionComponent } from '../company-home/blog-section/blog-section.component';
import { LoadingComponent } from '../../../shared/skeleton-loader/widgets/loading/loading.component';
import { FooterComponent } from '../../widgets/footer/footer.component';
import { CommonService } from '../../../shared/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-about',
  standalone: true,
  imports: [BrandLogoComponent, HeaderComponent, TitleSectionComponent,
    AboutUsComponent, FeatureSectionComponent, TeamSectionComponent,
    BlogSectionComponent, DownloadComponent, FooterComponent, LoadingComponent],
  templateUrl: './company-about.component.html',
  styleUrl: './company-about.component.scss'
})

export class CompanyAboutComponent {

  public currentUrl: string;

  public title: blogTitle = {
    title: 'about us',
    pages: 'about us'
  }

  constructor(private router: Router,public commonService: CommonService) {
    this.currentUrl = this.router.url;
  }

  ngOnInit() {
    document.body.classList.add('bg-white');
  }

  ngOnChanges(){
    if(this.commonService.dark === true){
      document.body.classList.remove('bg-white');
    }
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-white');
  }

}
