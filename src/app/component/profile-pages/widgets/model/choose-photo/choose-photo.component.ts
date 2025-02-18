import { Component } from '@angular/core';
import { NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { album, closeAlbum, uploaded } from '../../../../../shared/data/profile-pages/time-line';
import { FeatherIconComponent } from '../../../../../shared/components/common/feather-icon/feather-icon.component';

@Component({
  selector: 'app-choose-photo',
  standalone: true,
  imports: [FeatherIconComponent,NgbNavModule,CommonModule],
  templateUrl: './choose-photo.component.html',
  styleUrl: './choose-photo.component.scss'
})

export class ChoosePhotoComponent {

  public  active = 1;
  public uploaded = uploaded;
  public album = album;
  public closeAlbum = closeAlbum;
  public isOpen :boolean = false;

  constructor(public modalServices: NgbModal) { }

}
