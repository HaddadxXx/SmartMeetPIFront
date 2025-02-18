import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SvgIconComponent } from '../../../svg-icon/svg-icon.component';
import { FeatherIconComponent } from '../../../feather-icon/feather-icon.component';

import { NavService, navItems } from '../../../../../services/nav.service';
import { ClickOutSideDirective } from '../../../../../directives/click-out-side.directive';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [FeatherIconComponent,SvgIconComponent,RouterModule,ClickOutSideDirective],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss'
})

export class MobileMenuComponent {

  public isMobile:boolean = false;
  public menuItemsData: navItems[];

  constructor(public navServices: NavService) {}

  ngOnInit(){
    this.navServices.itemsMobile.subscribe((data) => {
      this.menuItemsData = data;
    })
  }


}
