import { Component } from '@angular/core';
import { HeaderOneComponent } from '../../../shared/components/common/header/header-one/header-one.component';
import { PopularTopicsComponent } from './popular-topics/popular-topics.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { DownloadComponent } from '../../widgets/download/download.component';
import { BreadcrumbSectionComponent } from './breadcrumb-section/breadcrumb-section.component';
import { LoadingComponent } from '../../../shared/skeleton-loader/widgets/loading/loading.component';
import { FooterComponent } from '../../widgets/footer/footer.component';

@Component({
  selector: 'app-help-support',
  standalone: true,
  imports: [HeaderOneComponent,PopularTopicsComponent,InquiryComponent,
    LoadingComponent,DownloadComponent,FooterComponent,BreadcrumbSectionComponent],
  templateUrl: './help-support.component.html',
  styleUrl: './help-support.component.scss'
})

export class HelpSupportComponent {

  ngOnInit() {
    document.body.classList.add('bg-white');
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-white');
  }

}
