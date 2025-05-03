import { Component } from '@angular/core';
import { HeaderOneComponent } from "../../../shared/components/common/header/header-one/header-one.component";
import { blogTitle } from '../../../shared/interface/common';
import { TitleSectionComponent } from "../../widgets/title-section/title-section.component";
import { FooterComponent } from "../../widgets/footer/footer.component";
import { DownloadComponent } from "../../widgets/download/download.component";
import { ContactsSectionComponent } from "./contacts-section/contacts-section.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SponsoringOfferService } from 'c:/Users/acer/Desktop/SmartMeetPIFront-main (2)/SmartMeetPIFront-main/src/app/shared/services/sponsoring-offer.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'c:/Users/acer/Desktop/SmartMeetPIFront-main (2)/SmartMeetPIFront-main/src/app/shared/services/auth.service';

@Component({
  selector: 'app-contacts-us',
  standalone: true,
  imports: [HeaderOneComponent, TitleSectionComponent, FooterComponent, DownloadComponent, ContactsSectionComponent,CommonModule, FormsModule],
  templateUrl: './contacts-us.component.html',
  styleUrl: './contacts-us.component.scss'
})

export class ContactsUsComponent {

  public title: blogTitle = {
    title: 'Contact us',
    pages: 'Contact us'
  }

  ngOnInit() {
    document.body.classList.add('bg-white');
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-white');
  }
  
}
