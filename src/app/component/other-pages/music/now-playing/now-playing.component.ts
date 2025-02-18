import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';
import { songs } from '../../../../shared/interface/music';
import { MusicService } from '../../../../shared/services/music.service';
import { ClickOutSideDirective } from '../../../../shared/directives/click-out-side.directive';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrl: './now-playing.component.scss',
  imports: [FeatherIconComponent,CarouselModule,CommonModule,ClickOutSideDirective],
  standalone:true
})

export class NowPlayingComponent {

  public popularSongs: songs[];
  public isShow :boolean = false;

  public musicOptions = {
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
      600: {
        items: 1,
      },
      1000: {
        items: 8,
      },
    },
  };

  constructor(public musicServices: MusicService) { }

  ngOnInit() {
    this.musicServices.songList().subscribe(response => {
      this.popularSongs = response.songList;
    })
  }

  outSideClose(){
     this.isShow = false;
  }

  prevSong() {

  }

  toggleState(){
    
  }


  nextSong() {
  }
}
