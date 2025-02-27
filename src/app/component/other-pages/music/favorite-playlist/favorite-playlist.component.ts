import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClickOutSideDirective } from '../../../../shared/directives/click-out-side.directive';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';

import { MusicService } from '../../../../shared/services/music.service';

import { singer } from '../../../../shared/interface/music';

@Component({
  selector: 'app-favorite-playlist',
  templateUrl: './favorite-playlist.component.html',
  styleUrl: './favorite-playlist.component.scss',
  imports: [FeatherIconComponent,CommonModule,ClickOutSideDirective],
  standalone:true
})

export class FavoritePlaylistComponent {

  public favoritePlaylist: singer[];
  public isShow: boolean = false;

  constructor(public musicService: MusicService) { }

  ngOnInit() {
    this.musicService.favoritePlaylist().subscribe(res => {
      this.favoritePlaylist = res.favoritePlaylist;
    })
  }

  favorite(item: singer) {
    return item.favorite = !item.favorite
  }

  outSideClose(){
     this.isShow = false;
  }

}
