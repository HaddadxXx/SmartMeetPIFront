import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';

import { sharedPostIcon } from '../../../data/common';
import { ClickOutSideDirective } from '../../../directives/click-out-side.directive';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrl: './share.component.scss',
  imports: [FeatherIconComponent,ClickOutSideDirective],
  standalone:true
})

export class ShareComponent {

  public isShow: boolean = false;
  public isOpen: boolean = false;
  public sharedPostIcon = sharedPostIcon;

  constructor(public modalServices: NgbModal) { }

  outSideClose(){
     this.isShow = false;
  }

  outSide(){
    this.isOpen = false;
  }

}
