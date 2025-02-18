import { Component } from '@angular/core';
import { FeatherIconComponent } from '../feather-icon/feather-icon.component';
import { ClickOutSideDirective } from '../../../directives/click-out-side.directive';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-box',
  templateUrl: './profile-box.component.html',
  styleUrl: './profile-box.component.scss',
  imports: [FeatherIconComponent,ClickOutSideDirective,RouterModule],
  standalone:true
})

export class ProfileBoxComponent {
  
  public isShow: boolean = false;

  outSideClose(){
      this.isShow = false;
  }

}
