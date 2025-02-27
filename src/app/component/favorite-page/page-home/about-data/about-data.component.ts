import { Component } from '@angular/core';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileComponent } from '../../../profile-pages/widgets/model/edit-profile/edit-profile.component';

@Component({
  selector: 'app-about-data',
  templateUrl: './about-data.component.html',
  styleUrl: './about-data.component.scss',
  imports: [FeatherIconComponent],
  standalone: true
})

export class AboutDataComponent {

  constructor(public modal: NgbModal) {}

  open() {
    this.modal.open(EditProfileComponent, { size: 'lg' })
  }

}
