import { Component } from '@angular/core';
import { YourFavoriteArtistComponent } from './your-favorite-artist/your-favorite-artist.component';
import { NowPlayingComponent } from './now-playing/now-playing.component';
import { PopularSongsComponent } from './popular-songs/popular-songs.component';
import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { FavoritePlaylistComponent } from './favorite-playlist/favorite-playlist.component';
import { MusicSkeletonComponent } from '../../../shared/skeleton-loader/others-pages-skeleton/music-skeleton/music-skeleton.component';

import { CommonService } from '../../../shared/services/common.service';
import { ClickOutSideDirective } from '../../../shared/directives/click-out-side.directive';

import { timeline } from '../../../shared/data/others-pages/others-pages';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [FeatherIconComponent,YourFavoriteArtistComponent,
    FavoritePlaylistComponent,NowPlayingComponent,MusicSkeletonComponent,
    PopularSongsComponent,ClickOutSideDirective],
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
