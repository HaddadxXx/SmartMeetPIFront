import { Component } from '@angular/core';
import { HeaderOneComponent } from "../../../shared/components/common/header/header-one/header-one.component";
import { blogTitle } from '../../../shared/interface/common';
import { TitleSectionComponent } from "../../widgets/title-section/title-section.component";
import { FooterComponent } from "../../widgets/footer/footer.component";
import { DownloadComponent } from "../../widgets/download/download.component";
import { ContactsSectionComponent } from "./contacts-section/contacts-section.component";

@Component({
  selector: 'app-contacts-us',
  standalone: true,
  imports: [HeaderOneComponent, TitleSectionComponent, FooterComponent, DownloadComponent, ContactsSectionComponent],
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
