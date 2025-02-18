import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../widgets/header/header.component';
import { TitleSectionComponent } from '../../widgets/title-section/title-section.component';
import { FeatherComponent } from './feather/feather.component';
import { ThemeIconComponent } from './theme-icon/theme-icon.component';
import { WeatherIconsComponent } from './weather-icons/weather-icons.component';
import { AllSvgComponent } from './all-svg/all-svg.component';
import { AllSvgWeatherComponent } from './all-svg-weather/all-svg-weather.component';
import { DownloadComponent } from '../../widgets/download/download.component';
import { LoadingComponent } from '../../../shared/skeleton-loader/widgets/loading/loading.component';
import { FooterComponent } from '../../widgets/footer/footer.component';

import { blogTitle } from '../../../shared/interface/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [HeaderComponent, TitleSectionComponent, ThemeIconComponent,
    FeatherComponent, WeatherIconsComponent, AllSvgComponent,
    AllSvgWeatherComponent, DownloadComponent, FooterComponent,
  LoadingComponent],
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.scss'
})

export class IconsComponent {

 public currentUrl: string;

  public title: blogTitle = {
    title: 'Icons & Emoji',
    pages: 'Icons & Emoji'
  }

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
  }

}
