import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserWrapComponent } from '../widgets/user-wrap/user-wrap.component';
import { FeatherIconComponent } from '../../common/feather-icon/feather-icon.component';
import { SvgIconComponent } from '../../common/svg-icon/svg-icon.component';

import { NavService, navItems } from '../../../services/nav.service';

@Component({
  selector: 'app-sidebar-three',
  standalone: true,
  imports: [UserWrapComponent,FeatherIconComponent,SvgIconComponent,CommonModule],
  templateUrl: './sidebar-three.component.html',
  styleUrl: './sidebar-three.component.scss'
})

export class SidebarThreeComponent {

  @Input() currentUrl :string;
  public menuItemsThird: navItems[];
  public user = 'assets/images/user-sm/14.jpg'

  constructor(public navServices: NavService) { }

  ngOnInit() {
    this.navServices.itemsThird.subscribe((data) => {
      this.menuItemsThird = data;
    })
  }

}
