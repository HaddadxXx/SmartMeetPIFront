import { Component } from '@angular/core';

import { ApplyHereComponent } from './apply-here/apply-here.component';

@Component({
  selector: 'app-marketing-analyst',
  standalone: true,
  imports: [ApplyHereComponent],
  templateUrl: './marketing-analyst.component.html',
  styleUrl: './marketing-analyst.component.scss'
})

export class MarketingAnalystComponent {

}
