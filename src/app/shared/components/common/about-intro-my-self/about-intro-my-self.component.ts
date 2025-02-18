import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FeatherIconComponent } from '../feather-icon/feather-icon.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { EditProfileComponent } from '../../../../component/profile-pages/widgets/model/edit-profile/edit-profile.component';

import { introMySelf, introMySelfFooter } from '../../../data/profile-pages/time-line';

@Component({
  selector: 'app-about-intro-my-self',
  standalone: true,
  imports: [FeatherIconComponent ,SvgIconComponent],
  templateUrl: './about-intro-my-self.component.html',
  styleUrl: './about-intro-my-self.component.scss'
})

export class AboutIntroMySelfComponent {

  @Input() introMySelf :introMySelf[];

  public introMySelfFooter = introMySelfFooter ;

  constructor(public modalServices :NgbModal){}

  editProfile(){
     this.modalServices.open(EditProfileComponent, {size:'lg'})

  }

}
