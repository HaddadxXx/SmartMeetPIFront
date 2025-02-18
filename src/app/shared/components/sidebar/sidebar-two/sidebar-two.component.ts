import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { UserWrapComponent } from '../widgets/user-wrap/user-wrap.component';

import { NavService, navItems } from '../../../services/nav.service';

@Component({
  selector: 'app-sidebar-two',
  standalone: true,
  imports: [CommonModule,UserWrapComponent],
  templateUrl: './sidebar-two.component.html',
  styleUrl: './sidebar-two.component.scss'
})

export class SidebarTwoComponent {

  @Input() currentUrl :string;
  public user = 'assets/images/story/8.jpg'
  public menuItemsSecond: navItems[];

  constructor(public navServices: NavService) { }

  ngOnInit() {
    this.navServices.itemsSecond.subscribe((res) => {
      this.menuItemsSecond = res;
    })
  }

}
