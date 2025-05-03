import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { artist } from '../../../../shared/interface/music';
import { MusicService } from '../../../../shared/services/music.service';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';
import { ClickOutSideDirective } from '../../../../shared/directives/click-out-side.directive';

@Component({
  selector: 'app-your-favorite-artist',
  templateUrl: './your-favorite-artist.component.html',
  styleUrl: './your-favorite-artist.component.scss',
  imports:[FeatherIconComponent,CarouselModule,CommonModule,ClickOutSideDirective],
  standalone: true
})

export class YourFavoriteArtistComponent {

  public artist : artist[];
  public isShow : boolean = false;

  public artistListOptions = {
    loop: false,
    margin: 15,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: false,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 1.5,
      },
      550: {
        items: 3.5,
      },
      600: {
        items: 4.5,
      },
      900: {
        items: 5.5,
      },
      1050: {
        items: 6.5,
      },
    },
  };

  constructor(public musicServices: MusicService) {
  }

  ngOnInit() {
    this.musicServices.yourFavoriteArtist().subscribe(response => {
      this.artist = response.favoriteArtist;
    })
  }

}
