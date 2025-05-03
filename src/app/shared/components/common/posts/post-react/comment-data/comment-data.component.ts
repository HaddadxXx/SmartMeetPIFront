import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { FeatherIconComponent } from '../../../feather-icon/feather-icon.component';
import { PopoverLoaderComponent } from '../../../popover-loader/popover-loader.component';

import { CommonService } from '../../../../../services/common.service';

import { comment } from '../../../../../data/common';

@Component({
  selector: 'app-comment-data',
  templateUrl: './comment-data.component.html',
  styleUrl: './comment-data.component.scss',
  imports:[FeatherIconComponent,PopoverLoaderComponent,CommonModule,NgbModule],
  standalone:true
})

export class CommentDataComponent {

  public comment = comment;

  constructor(public commonServices :CommonService){

  }

}
