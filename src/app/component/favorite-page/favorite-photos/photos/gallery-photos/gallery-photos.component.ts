import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { FeatherIconComponent } from '../../../../../shared/components/common/feather-icon/feather-icon.component';
import { OpenModalComponent } from '../../../../../shared/components/common/gallery/open-modal/open-modal.component';

import { SinglePageService } from '../../../../../shared/services/single-page.service';

import { gallery } from '../../../../../shared/interface/single-page';
import { ClickOutSideDirective } from '../../../../../shared/directives/click-out-side.directive';

@Component({
  selector: 'app-gallery-photos',
  templateUrl: './gallery-photos.component.html',
  styleUrl: './gallery-photos.component.scss',
  imports: [CommonModule, FeatherIconComponent,ClickOutSideDirective],
  standalone: true
})

export class GalleryPhotosComponent {

  public href: string;
  public photos: gallery[];
  public isShow : boolean = false;

  constructor(public singlePageServices: SinglePageService,
    public modalServices: NgbModal, private router: Router) {
  }

  ngOnInit() {
    this.singlePageServices.photosGallery().subscribe(response => {
      if (response.gallery) {
        this.photos = response.gallery;
      }
      this.href = this.router.url;
    })
  }

  open() {
    if (this.href === '/profile-pages/gallery') {
      this.modalServices.open(OpenModalComponent, { fullscreen: true, windowClass: 'comment-model', });
    }
  }

}
