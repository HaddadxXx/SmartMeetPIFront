import { Component } from '@angular/core';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';

import { SvgIconComponent } from '../../../../shared/components/common/svg-icon/svg-icon.component';

import { teamSection } from '../../../../shared/data/company-pages/company';

@Component({
  selector: 'app-team-section',
  standalone: true,
  imports: [SvgIconComponent,CarouselModule,CommonModule],
  templateUrl: './team-section.component.html',
  styleUrl: './team-section.component.scss'
})

export class TeamSectionComponent {

  public teamSection = teamSection ;

  public option = {
    loop: false,
    margin: 20,
    autoplay: false,
    autoplayTimeout: 1000,
    autoplayHoverPause: false,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 2,
      },
      1000: {
        items: 5,
      },
    },
  };

}
