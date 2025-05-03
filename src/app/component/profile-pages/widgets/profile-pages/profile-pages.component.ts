import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProfileContentComponent } from './profile-content/profile-content.component';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';
import { ChoosePhotoComponent } from '../model/choose-photo/choose-photo.component';
import { ClickOutSideDirective } from '../../../../shared/directives/click-out-side.directive';

@Component({
  selector: 'app-profile-pages',
  standalone: true,
  imports: [ProfileContentComponent, FeatherIconComponent,ClickOutSideDirective],
  templateUrl: './profile-pages.component.html',
  styleUrl: './profile-pages.component.scss'
})

export class ProfilePagesComponent {

  public isShow: boolean = false;

  constructor(public modalServices: NgbModal) { }

  choosePhoto() {
    this.modalServices.open(ChoosePhotoComponent, {
      size: 'lg',
      windowClass: 'Choose-photo-modal'
    })
  }

  outSideClose() {
    this.isShow = false;
  }

}

