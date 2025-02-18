import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { FeatherIconComponent } from '../common/feather-icon/feather-icon.component';
import { SvgIconComponent } from '../common/svg-icon/svg-icon.component';
import { SidebarOneComponent } from './sidebar-one/sidebar-one.component';
import { SidebarThreeComponent } from './sidebar-three/sidebar-three.component';
import { SidebarTwoComponent } from './sidebar-two/sidebar-two.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FeatherIconComponent, SvgIconComponent, SidebarOneComponent, SidebarTwoComponent, 
    SidebarThreeComponent, RouterModule, CarouselModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {

  @Input() currentUrl: string;
  
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

}