import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { gallerySrc } from '../../../../../interface/post';

import { OpenModalComponent } from '../../../gallery/open-modal/open-modal.component';

@Component({
  selector: 'app-gallery-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery-section.component.html',
  styleUrl: './gallery-section.component.scss'
})

export class GallerySectionComponent {

  @Input() data :gallerySrc[];

  constructor(public modalServices:NgbModal){}

  openModel(){
    this.modalServices.open(OpenModalComponent, { fullscreen: true, windowClass: 'comment-model', });

 }

}
