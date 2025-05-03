import { Component, Input } from '@angular/core';
import { FeatherIconComponent } from '../feather-icon/feather-icon.component';
import { ClickOutSideDirective } from '../../../directives/click-out-side.directive';

@Component({
  selector: 'app-birthday-section',
  standalone: true,
  imports: [FeatherIconComponent,ClickOutSideDirective],
  templateUrl: './birthday-section.component.html',
  styleUrl: './birthday-section.component.scss'
})

export class BirthdaySectionComponent {

  public isShow: boolean = false;
  @Input() class: string;

  outSideClose(){
     this.isShow = false;
  }

}
