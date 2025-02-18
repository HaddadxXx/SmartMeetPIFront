import { Component } from '@angular/core';

import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { HobbiesInterestComponent } from '../../../shared/components/common/hobbies-interest/hobbies-interest.component';
import { PageCoverComponent } from '../widgets/page-cover/page-cover.component';
import { ProfileMenuComponent } from '../widgets/profile-menu/profile-menu.component';
import { AboutProfileBoxComponent } from './about-profile-box/about-profile-box.component';

import { CommonService } from '../../../shared/services/common.service';

import { Router } from '@angular/router';
import { hobbyInterestSingle } from '../../../shared/data/favorite-page/favorite-page';
import { PageAboutSkeletonComponent } from '../../../shared/skeleton-loader/favorite-pages-skeleton/page-about-skeleton/page-about-skeleton.component';

@Component({
  selector: 'app-favorite-about',
  standalone: true,
  imports: [PageCoverComponent, ProfileMenuComponent, AboutProfileBoxComponent,PageAboutSkeletonComponent,
    FeatherIconComponent, HobbiesInterestComponent],
  templateUrl: './favorite-about.component.html',
  styleUrl: './favorite-about.component.scss'
})

export class FavoriteAboutComponent {

  public currentUrl: string;
  public hobbyInterest = hobbyInterestSingle;

  constructor(public commonServices: CommonService, private router: Router) {
    this.currentUrl = this.router.url;

  }

}
