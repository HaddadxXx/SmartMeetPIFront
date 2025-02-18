import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FeatherIconComponent } from '../feather-icon/feather-icon.component';
import { OpenModalComponent } from './open-modal/open-modal.component';

import { CommonService } from '../../../services/common.service';

import { galleryRecord } from '../../../interface/common';
import { ClickOutSideDirective } from '../../../directives/click-out-side.directive';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  imports:[FeatherIconComponent,OpenModalComponent,CommonModule,ClickOutSideDirective],
  standalone:true
})

export class GalleryComponent {

  public galleryData: galleryRecord[];
  public isShow : boolean = false;
  constructor( public commonService: CommonService , public modalServices:NgbModal) { }

  ngOnInit() {
    this.commonService.gallery().subscribe(response => {
      if (response.galleryRecord) {
        this.galleryData = response.galleryRecord;
      }
    })
  }

  openModel(){
      this.modalServices.open(OpenModalComponent, { fullscreen: true ,  windowClass: 'comment-model',});
  }

  outSideClose(){
   this.isShow = false;
  }
}
