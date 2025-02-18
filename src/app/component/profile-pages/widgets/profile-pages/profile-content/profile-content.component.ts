import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileComponent } from '../../model/edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile-content',
  standalone: true,
  imports: [],
  templateUrl: './profile-content.component.html',
  styleUrl: './profile-content.component.scss'
})

export class ProfileContentComponent {

  constructor(public modalServices: NgbModal) {}

  editProfile() {
    this.modalServices.open(EditProfileComponent, { size: 'lg' })

  }

}
