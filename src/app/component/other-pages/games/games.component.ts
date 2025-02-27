import { Component } from '@angular/core';

import { PopularYourFriendsComponent } from './popular-your-friends/popular-your-friends.component';
import { Top5GamesComponent } from './top-5-games/top-5-games.component';
import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { AllGamesComponent } from './all-games/all-games.component';
import { GamesSkeletonComponent } from '../../../shared/skeleton-loader/others-pages-skeleton/games-skeleton/games-skeleton.component';

import { CommonService } from '../../../shared/services/common.service';
import { ClickOutSideDirective } from '../../../shared/directives/click-out-side.directive';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [PopularYourFriendsComponent, Top5GamesComponent, FeatherIconComponent,
    GamesSkeletonComponent, AllGamesComponent , ClickOutSideDirective],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})

export class GamesComponent {

  public isShow: boolean = false;
  constructor(public commonServices: CommonService){}

  outSideClose() {
    this.isShow = false;
  }

}