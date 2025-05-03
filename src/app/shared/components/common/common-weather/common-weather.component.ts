import { Component, Input } from '@angular/core';
import { FeatherIconComponent } from '../feather-icon/feather-icon.component';
import { ClickOutSideDirective } from '../../../directives/click-out-side.directive';

@Component({
  selector: 'app-common-weather',
  templateUrl: './common-weather.component.html',
  styleUrl: './common-weather.component.scss',
  imports:[FeatherIconComponent,ClickOutSideDirective],
  standalone:true
})

export class CommonWeatherComponent {

  public isShow: boolean = false;
  @Input() image : string;

  outSideClose(){
     this.isShow = false;
  }

}
