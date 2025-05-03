import { Component } from '@angular/core';
import { FeatherIconComponent } from '../../../feather-icon/feather-icon.component';
import { CommonService } from '../../../../../services/common.service';

@Component({
  selector: 'app-mode',
  standalone: true,
  imports: [FeatherIconComponent],
  templateUrl: './mode.component.html',
  styleUrl: './mode.component.scss'
})

export class ModeComponent {

  constructor(public commonServices :CommonService){}

 
}
