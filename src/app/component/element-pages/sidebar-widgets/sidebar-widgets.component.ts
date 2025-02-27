import { Component, Input } from '@angular/core';
import { BirthdaySectionComponent } from '../../../shared/components/common/birthday-section/birthday-section.component';
import { CollegeMeetComponent } from '../../../shared/components/common/college-meet/college-meet.component';
import { CommonWeatherComponent } from '../../../shared/components/common/common-weather/common-weather.component';
import { EventsComponent } from '../../../shared/components/common/events/events.component';
import { FriendSuggestionComponent } from '../../../shared/components/common/friend-suggestion/friend-suggestion.component';
import { GalleryComponent } from '../../../shared/components/common/gallery/gallery.component';
import { LikedPagesComponent } from '../../../shared/components/common/liked-pages/liked-pages.component';
import { ProfileBoxComponent } from '../../../shared/components/common/profile-box/profile-box.component';
import { YourGamesComponent } from '../../../shared/components/common/your-games/your-games.component';
import { event } from '../../../shared/data/common';
import { blogTitle } from '../../../shared/interface/common';
import { LoadingComponent } from '../../../shared/skeleton-loader/widgets/loading/loading.component';
import { NowPlayingComponent } from '../../other-pages/music/now-playing/now-playing.component';
import { PopularSongsComponent } from '../../other-pages/music/popular-songs/popular-songs.component';
import { SearchLocationComponent } from '../../other-pages/weather/search-location/search-location.component';
import { DownloadComponent } from '../../widgets/download/download.component';
import { HeaderComponent } from '../../widgets/header/header.component';
import { TitleSectionComponent } from '../../widgets/title-section/title-section.component';
import { FooterComponent } from '../../widgets/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-widgets',
  standalone: true,
  imports: [HeaderComponent, TitleSectionComponent, ProfileBoxComponent,
    FriendSuggestionComponent, CommonWeatherComponent, YourGamesComponent,
    BirthdaySectionComponent, GalleryComponent, EventsComponent, LoadingComponent
    , NowPlayingComponent, CollegeMeetComponent, PopularSongsComponent,
    LikedPagesComponent, SearchLocationComponent, DownloadComponent, FooterComponent],
  templateUrl: './sidebar-widgets.component.html',
  styleUrl: './sidebar-widgets.component.scss'
})

export class SidebarWidgetsComponent {

  public currentUrl: string;
  public event = event;

  public title: blogTitle = {
    title: 'Sidebar Widgets',
    pages: 'Sidebar Widgets'
  }

  public image = 'assets/images/icon/snow-flaks-blue.png';
  
  constructor(private router: Router) {
    this.currentUrl = this.router.url;
  }

}
