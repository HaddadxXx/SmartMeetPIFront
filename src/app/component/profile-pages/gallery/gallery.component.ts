import { Component } from '@angular/core';
import { PhotosComponent } from '../../favorite-page/favorite-photos/photos/photos.component';
import { ProfileMenuComponent } from '../widgets/profile-menu/profile-menu.component';
import { ProfilePagesComponent } from '../widgets/profile-pages/profile-pages.component';

import { Router } from '@angular/router';
import { CommonService } from '../../../shared/services/common.service';
import { ProfileGallerySkeletonComponent } from '../../../shared/skeleton-loader/profile-pages-skeleton/profile-gallery-skeleton/profile-gallery-skeleton.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [ProfilePagesComponent,ProfileMenuComponent,PhotosComponent,
    ProfileGallerySkeletonComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})

export class GalleryComponent {

  public currentUrl: string;

  constructor(public commonServices:CommonService,private router: Router) {
    this.currentUrl = this.router.url;

  }


}
