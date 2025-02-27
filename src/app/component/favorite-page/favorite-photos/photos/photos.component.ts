import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { AlbumComponent } from './album/album.component';
import { GalleryPhotosComponent } from './gallery-photos/gallery-photos.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
  imports : [GalleryPhotosComponent,CommonModule,AlbumComponent],
  standalone :true
})

export class PhotosComponent {

  public openTab: string = "album";

  changeTab(val: string) {
    this.openTab = val;
  }
  

}
