import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FeatherIconComponent } from '../../../feather-icon/feather-icon.component';
import { ClickOutSideDirective } from '../../../../../directives/click-out-side.directive';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FeatherIconComponent, RouterModule,ClickOutSideDirective],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent {

  public isOpen: boolean = false;

  constructor(public router: Router) {}

  outSideClose() {
    this.isOpen = false;
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl("/auth/login");
  }

}
