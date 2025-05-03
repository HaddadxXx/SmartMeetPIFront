import { Component } from '@angular/core';
import { YourFavoriteArtistComponent } from './your-favorite-artist/your-favorite-artist.component';
import { NowPlayingComponent } from './now-playing/now-playing.component';
import { PopularSongsComponent } from './popular-songs/popular-songs.component';
import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { FavoritePlaylistComponent } from './favorite-playlist/favorite-playlist.component';
import { MusicSkeletonComponent } from '../../../shared/skeleton-loader/others-pages-skeleton/music-skeleton/music-skeleton.component';
<<<<<<< HEAD
import { SponsoringOfferComponent } from './sponsor/sponsor.component';
import { ContactsSectionComponent } from '../../company-pages/contacts-us/contacts-section/contacts-section.component';
=======

>>>>>>> NEW_Event_Session
import { CommonService } from '../../../shared/services/common.service';
import { ClickOutSideDirective } from '../../../shared/directives/click-out-side.directive';

import { timeline } from '../../../shared/data/others-pages/others-pages';
<<<<<<< HEAD
import { RouterLink } from '@angular/router';
=======
>>>>>>> NEW_Event_Session

@Component({
  selector: 'app-music',
  standalone: true,
<<<<<<< HEAD
  imports: [FeatherIconComponent,YourFavoriteArtistComponent,RouterLink,
    FavoritePlaylistComponent,NowPlayingComponent,MusicSkeletonComponent,
    PopularSongsComponent,ClickOutSideDirective,SponsoringOfferComponent,ContactsSectionComponent],
=======
  imports: [FeatherIconComponent,YourFavoriteArtistComponent,
    FavoritePlaylistComponent,NowPlayingComponent,MusicSkeletonComponent,
    PopularSongsComponent,ClickOutSideDirective],
>>>>>>> NEW_Event_Session
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss'
})

export class MusicComponent {

  public timeline = timeline ;
  public isOpen: boolean = false;

  constructor(public commonServices:CommonService){}

  outSideClose(){
     this.isOpen = false;
  }

}
