import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';

import { reviewStatement } from '../../../../shared/data/charts/apex-charts';
import { review } from '../../../../shared/data/favorite-page/favorite-page';

@Component({
  selector: 'app-review-section',
  templateUrl: './review-section.component.html',
  styleUrl: './review-section.component.scss',
  imports : [FeatherIconComponent,NgApexchartsModule],
  standalone:true
})

export class ReviewSectionComponent {

  public reviewStatement = reviewStatement;
  public review = review;


}
