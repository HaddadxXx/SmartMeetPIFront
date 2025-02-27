import { Component } from '@angular/core';

import { allSvgWeather } from '../../../../shared/data/element-pages/icon';

@Component({
  selector: 'app-all-svg-weather',
  standalone: true,
  imports: [],
  templateUrl: './all-svg-weather.component.html',
  styleUrl: './all-svg-weather.component.scss'
})

export class AllSvgWeatherComponent {

  public allSvgWeather = allSvgWeather ;

}
