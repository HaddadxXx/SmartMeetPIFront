import { Component, Input } from '@angular/core';
import { EventColor } from 'calendar-utils';
import { blogTitle } from '../../../shared/interface/common';
import { HeaderComponent } from '../../widgets/header/header.component';
import { TitleSectionComponent } from '../../widgets/title-section/title-section.component';
import { CommonCalenderComponent } from '../../widgets/common-calender/common-calender.component';
import { DownloadComponent } from '../../widgets/download/download.component';
import { LoadingComponent } from '../../../shared/skeleton-loader/widgets/loading/loading.component';
import { FooterComponent } from '../../widgets/footer/footer.component';
import { Router } from '@angular/router';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
}

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [HeaderComponent, TitleSectionComponent,CommonCalenderComponent,
    LoadingComponent,DownloadComponent,FooterComponent],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss'
})

export class CalenderComponent {

  @Input() currentUrl: string;

  public isShow: boolean = true;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
   
  }

  public title: blogTitle = {
    title: 'Event Calendar',
    pages: 'event calendar'
  }

}
