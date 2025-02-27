import { Component } from '@angular/core';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';
import { ClickOutSideDirective } from '../../../../shared/directives/click-out-side.directive';

@Component({
  selector: 'app-weather-section',
  templateUrl: './weather-section.component.html',
  imports: [FeatherIconComponent,ClickOutSideDirective],
  standalone:true,
  styleUrl: './weather-section.component.scss'
})

export class WeatherSectionComponent {

  public isOpen:boolean = false;

  outSideClose(){
    this.isOpen = false;
 }

}
