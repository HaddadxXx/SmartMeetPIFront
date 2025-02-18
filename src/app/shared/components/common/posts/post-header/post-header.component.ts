import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FeatherIconComponent } from '../../feather-icon/feather-icon.component';
import { PopoverLoaderComponent } from '../../popover-loader/popover-loader.component';

import { CommonService } from '../../../../services/common.service';

import { profile } from '../../../../interface/post';
import { ClickOutSideDirective } from '../../../../directives/click-out-side.directive';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrl: './post-header.component.scss',
  standalone: true,
  imports: [FeatherIconComponent, CommonModule,NgbModule,
    PopoverLoaderComponent,ClickOutSideDirective],
})

export class PostHeaderComponent {

  public isShow: boolean = false;
  @Input() postData: profile;
  constructor(public commonServices :CommonService){}

  outSideClose(){
    this.isShow = false;
   }

}
