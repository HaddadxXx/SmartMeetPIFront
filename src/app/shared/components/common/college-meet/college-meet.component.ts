import { Component } from '@angular/core';
import { FeatherIconComponent } from '../feather-icon/feather-icon.component';
import { CommonModule } from '@angular/common';
import { collegeMeet } from '../../../data/common';
import { ClickOutSideDirective } from '../../../directives/click-out-side.directive';

@Component({
  selector: 'app-college-meet',
  standalone: true,
  imports: [FeatherIconComponent, CommonModule, ClickOutSideDirective],
  templateUrl: './college-meet.component.html',
  styleUrl: './college-meet.component.scss'
})

export class CollegeMeetComponent {

  public isShow: boolean = false;

  public collegeMeet = collegeMeet;

  outSideClose() {
    this.isShow = false;
  }

}
