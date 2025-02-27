import { Component } from '@angular/core';
import { ourFeatures } from '../../../../shared/data/company-pages/company';

@Component({
  selector: 'app-our-features',
  standalone: true,
  imports: [],
  templateUrl: './our-features.component.html',
  styleUrl: './our-features.component.scss'
})

export class OurFeaturesComponent {

  public ourFeatures = ourFeatures ;

}
