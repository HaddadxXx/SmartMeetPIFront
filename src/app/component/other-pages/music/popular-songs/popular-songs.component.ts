import { Component } from '@angular/core';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';
import { MusicService } from '../../../../shared/services/music.service';
import { song } from '../../../../shared/interface/music';
import { ClickOutSideDirective } from '../../../../shared/directives/click-out-side.directive';


@Component({
  selector: 'app-popular-songs',
  templateUrl: './popular-songs.component.html',
  styleUrl: './popular-songs.component.scss',
  imports: [FeatherIconComponent,ClickOutSideDirective],
  standalone:true
})

export class PopularSongsComponent {

  public popularSongs: song[];
  public isShow: boolean;

  constructor(public musicServices: MusicService) { }

  ngOnInit() {
    this.musicServices.popularSongs().subscribe(response => {
      this.popularSongs = response.popularSongs;
    })
  }

  show(item: song) {
    this.popularSongs.forEach(i => {
      if (i !== item) {
        i.isShow = false;
      }
    });
    item.isShow = !item.isShow;
  }

  outSideClose(){
    this.isShow = false;
 }
 
}
