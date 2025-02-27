import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';
import { SvgIconComponent } from '../../../../shared/components/common/svg-icon/svg-icon.component';

import { GamesService } from '../../../../shared/services/games.service';

import { popularYourFriendsData } from '../../../../shared/interface/games';

@Component({
  selector: 'app-popular-your-friends',
  standalone: true,
  imports: [CarouselModule,FeatherIconComponent,SvgIconComponent,CommonModule],
  templateUrl: './popular-your-friends.component.html',
  styleUrl: './popular-your-friends.component.scss'
})

export class PopularYourFriendsComponent {

  public popularYourGames : popularYourFriendsData[];

  public friendsOptions = {
    loop: false,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 2,
    autoplayHoverPause: false,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      300: {
        items: 2.5,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 8,
      },
    },
  };
  constructor(public gamesServices: GamesService) {}

  ngOnInit() {
    this.gamesServices.popularYourFriends().subscribe(response => {
      if(response.popularYourFriends) {
         this.popularYourGames = response.popularYourFriends;
      }
    })
  }
}

