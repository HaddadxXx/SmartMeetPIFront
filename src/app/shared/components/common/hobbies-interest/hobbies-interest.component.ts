import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EditProfileComponent } from '../../../../component/profile-pages/widgets/model/edit-profile/edit-profile.component';
import { FeatherIconComponent } from '../feather-icon/feather-icon.component';

import { hobbyInterest } from '../../../interface/single-page';

@Component({
  selector: 'app-hobbies-interest',
  standalone: true,
  imports: [FeatherIconComponent],
  templateUrl: './hobbies-interest.component.html',
  styleUrl: './hobbies-interest.component.scss'
})

export class HobbiesInterestComponent {

  @Input() hobbyInterests :hobbyInterest[];

  constructor(public modalServices :NgbModal){

  }

  editProfile(){
    this.modalServices.open(EditProfileComponent, { size: 'lg',windowClass: 'modal-custom-lg'})
  }

}
