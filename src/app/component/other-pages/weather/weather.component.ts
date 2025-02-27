import { Component } from '@angular/core';

import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { WeatherSectionComponent } from './weather-section/weather-section.component';
import { SearchLocationComponent } from './search-location/search-location.component';
import { WeathersSkeletonComponent } from '../../../shared/skeleton-loader/others-pages-skeleton/weathers-skeleton/weathers-skeleton.component';

import { ClickOutSideDirective } from '../../../shared/directives/click-out-side.directive';
import { CommonService } from '../../../shared/services/common.service';

import { hourlyForecast } from '../../../shared/data/others-pages/others-pages';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [FeatherIconComponent, SearchLocationComponent, WeatherSectionComponent,
    WeathersSkeletonComponent,ClickOutSideDirective],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})

export class WeatherComponent {

  public isShow: boolean = false;
  public isOpen: boolean = false;
  public hourlyForecast = hourlyForecast;

  constructor(public commonServices: CommonService){

  }

  outSideClose() {
    this.isShow = false;
  }
  
  close(){
    this.isOpen = false;
  }

}
