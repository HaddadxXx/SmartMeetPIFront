import { Component } from '@angular/core';
import { HeaderOneComponent } from '../../../shared/components/common/header/header-one/header-one.component';
import { PopularTopicsComponent } from './popular-topics/popular-topics.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { DownloadComponent } from '../../widgets/download/download.component';
import { BreadcrumbSectionComponent } from './breadcrumb-section/breadcrumb-section.component';
import { LoadingComponent } from '../../../shared/skeleton-loader/widgets/loading/loading.component';
import { FooterComponent } from '../../widgets/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SponsoringOfferService } from 'c:/Users/acer/Desktop/SmartMeetPIFront-main (2)/SmartMeetPIFront-main/src/app/shared/services/sponsoring-offer.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'c:/Users/acer/Desktop/SmartMeetPIFront-main (2)/SmartMeetPIFront-main/src/app/shared/services/auth.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-help-support',
  standalone: true,
  imports: [HeaderOneComponent,PopularTopicsComponent,InquiryComponent,CommonModule,FormsModule,
    LoadingComponent,DownloadComponent,FooterComponent,BreadcrumbSectionComponent],
  templateUrl: './help-support.component.html',
  styleUrl: './help-support.component.scss'
})

export class HelpSupportComponent {
  public isOpen: boolean = false;

  ngOnInit() {
    document.body.classList.add('bg-white');
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-white');
  }
  outSideClose(){
    this.isOpen = false;
 }
}
