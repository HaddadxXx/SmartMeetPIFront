import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { ShareComponent } from '../../../modal/share/share.component';

import { profile } from '../../../../interface/post';

@Component({
  selector: 'app-post-details-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-details-box.component.html',
  styleUrl: './post-details-box.component.scss'
})

export class PostDetailsBoxComponent {

  @Input() postData: profile;

  constructor(public modalServices: NgbModal) { }

  share() {
    this.modalServices.open(ShareComponent, {
      centered: true
    })
  }

}
