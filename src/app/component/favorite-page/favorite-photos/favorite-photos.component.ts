import { Component } from '@angular/core';

import { PageCoverComponent } from '../widgets/page-cover/page-cover.component';
import { ProfileMenuComponent } from '../widgets/profile-menu/profile-menu.component';
import { PhotosComponent } from './photos/photos.component';

import { Router } from '@angular/router';
import { CommonService } from '../../../shared/services/common.service';
import { ProfileGallerySkeletonComponent } from '../../../shared/skeleton-loader/profile-pages-skeleton/profile-gallery-skeleton/profile-gallery-skeleton.component';

@Component({
  selector: 'app-favorite-photos',
  standalone: true,
  imports: [PageCoverComponent,ProfileMenuComponent,PhotosComponent,
    ProfileGallerySkeletonComponent,],
  templateUrl: './favorite-photos.component.html',
  styleUrl: './favorite-photos.component.scss'
})

export class FavoritePhotosComponent {

  public currentUrl: string;
  
  constructor(public commonServices: CommonService,private router: Router) {
    this.currentUrl = this.router.url;
  }

}
