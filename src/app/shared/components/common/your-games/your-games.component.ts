import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { FeatherIconComponent } from '../feather-icon/feather-icon.component';

import { gamesList } from '../../../data/common';
import { ClickOutSideDirective } from '../../../directives/click-out-side.directive';

@Component({
  selector: 'app-your-games',
  standalone: true,
  imports: [FeatherIconComponent,NgbModule,
    CarouselModule,CommonModule,ClickOutSideDirective],
  templateUrl: './your-games.component.html',
  styleUrl: './your-games.component.scss'
})

export class YourGamesComponent {

  public isShow: boolean = false;

  public gamesList = gamesList;

  public gamesListOptions = {
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: false,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  };

  outSideClose(){
    this.isShow = false;
   }

}
