import { Component } from '@angular/core';
import { FeatherIconComponent } from '../feather-icon/feather-icon.component';
import { ClickOutSideDirective } from '../../../directives/click-out-side.directive';

@Component({
  selector: 'app-worldwide-trends',
  standalone: true,
  imports: [FeatherIconComponent ,ClickOutSideDirective],
  templateUrl: './worldwide-trends.component.html',
  styleUrl: './worldwide-trends.component.scss'
})

export class WorldwideTrendsComponent {

  public isShow: boolean = false;

  outSideClose(){
     this.isShow = false;
  }

}
