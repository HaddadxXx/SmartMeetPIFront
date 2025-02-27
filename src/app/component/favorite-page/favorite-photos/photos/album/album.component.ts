import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherIconComponent } from '../../../../../shared/components/common/feather-icon/feather-icon.component';

import { SinglePageService } from '../../../../../shared/services/single-page.service';

import { album, gallery } from '../../../../../shared/interface/single-page';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
  imports : [FeatherIconComponent,CommonModule],
  standalone:true
})

export class AlbumComponent {

   public album :album[];
   public galleryOpen :gallery[];
   public isOpen: boolean = false;

  constructor(public singlePageServices: SinglePageService) {}

  ngOnInit() {
    this.singlePageServices.photosGallery().subscribe(response => {
      this.album = response.album;
      this.galleryOpen = response.galleryOpen;
    })
  }

}
