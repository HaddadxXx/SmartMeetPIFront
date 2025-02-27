import { Component } from '@angular/core';
import { SvgIconComponent } from '../../../../shared/components/common/svg-icon/svg-icon.component';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';
import { profile, socialMediaFavorite } from '../../../../shared/data/favorite-page/favorite-page';

@Component({
  selector: 'app-page-cover',
  standalone: true,
  imports: [FeatherIconComponent,SvgIconComponent],
  templateUrl: './page-cover.component.html',
  styleUrl: './page-cover.component.scss'
})

export class PageCoverComponent {

  public profile = profile;
  public socialMedia = socialMediaFavorite;

  public openTab: string = "home";

  changeTab(val: string) {
    this.openTab = val;
  }

}
