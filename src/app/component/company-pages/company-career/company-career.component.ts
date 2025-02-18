import { Component, Input } from '@angular/core';

import { DownloadComponent } from '../../widgets/download/download.component';
import { TitleSectionComponent } from '../../widgets/title-section/title-section.component';
import { HeaderComponent } from '../../widgets/header/header.component';
import { AllJobsComponent } from './all-jobs/all-jobs.component';
import { PerksBenefitsComponent } from './perks-benefits/perks-benefits.component';
import { LoadingComponent } from '../../../shared/skeleton-loader/widgets/loading/loading.component';
import { FooterComponent } from '../../widgets/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-career',
  standalone: true,
  imports: [HeaderComponent,TitleSectionComponent,LoadingComponent,
    PerksBenefitsComponent,AllJobsComponent,DownloadComponent,FooterComponent],
  templateUrl: './company-career.component.html',
  styleUrl: './company-career.component.scss'
})

export class CompanyCareerComponent {

  public currentUrl : string;

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
