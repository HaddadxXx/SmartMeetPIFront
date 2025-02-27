import { Component } from '@angular/core';

import { FeatherIconComponent } from '../../feather-icon/feather-icon.component';

import { emoji } from '../../../../data/common';

@Component({
  selector: 'app-like-panel',
  templateUrl: './like-panel.component.html',
  styleUrl: './like-panel.component.scss',
  imports: [FeatherIconComponent],
  standalone:true
})

export class LikePanelComponent {

  public emoji = emoji;

}
