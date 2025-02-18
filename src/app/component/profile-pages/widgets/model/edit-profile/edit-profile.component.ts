import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../../../shared/components/common/feather-icon/feather-icon.component';
import { ChoosePhotoComponent } from '../choose-photo/choose-photo.component';

import { relationshipStatus } from '../../../../../shared/data/profile-pages/time-line';
import { SvgIconComponent } from '../../../../../shared/components/common/svg-icon/svg-icon.component';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FeatherIconComponent, SvgIconComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})

export class EditProfileComponent {

  public relationshipStatus = relationshipStatus;

  constructor(public modalServices: NgbModal) { }

  editImage() {
    this.modalServices.open(ChoosePhotoComponent, { size: 'lg', windowClass: 'Choose-photo-modal' })
  }

}

