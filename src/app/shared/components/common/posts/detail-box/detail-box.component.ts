import { Component, Input } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { FeatherIconComponent } from '../../feather-icon/feather-icon.component';
import { PopoverLoaderComponent } from '../../popover-loader/popover-loader.component';

import { CommonService } from '../../../../services/common.service';

import { profile } from '../../../../interface/post';

@Component({
  selector: 'app-detail-box',
  templateUrl: './detail-box.component.html',
  styleUrl: './detail-box.component.scss',
  imports: [FeatherIconComponent, CommonModule, NgbModule, PopoverLoaderComponent],
  standalone: true
})

export class DetailBoxComponent {

  public isActive: boolean = false;
  public isBookmark: boolean = false;
  @Input() data: profile;

  constructor(public commonServices: CommonService) { }

}
