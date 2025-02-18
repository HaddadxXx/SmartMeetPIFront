import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FeatherIconComponent } from '../../common/feather-icon/feather-icon.component';
import { SvgIconComponent } from '../../common/svg-icon/svg-icon.component';

import { NavService, navItems } from '../../../services/nav.service';

import { gamesList } from '../../../data/common';

@Component({
  selector: 'app-sidebar-one',
  standalone: true,
  imports: [FeatherIconComponent, CarouselModule, SvgIconComponent, RouterModule],
  templateUrl: './sidebar-one.component.html',
  styleUrl: './sidebar-one.component.scss'
})

export class SidebarOneComponent {

  public menuItems: navItems[];
  public gameList = gamesList;

  public optionsData = {
    loop: false,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: false,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 8,
      },
    },
  };

  public imageData = [
    {
      image: 'assets/images/icon/game/1.jpg'
    },
    {
      image: 'assets/images/icon/game/2.jpg'
    },
    {
      image: 'assets/images/icon/game/3.jpg'
    },
    {
      image: 'assets/images/icon/game/4.jpg'
    },
  ]

  constructor(public navServices: NavService) { }

  ngOnInit() {
    this.navServices.items.subscribe((data) => {
      this.menuItems = data;
    })
  }

}