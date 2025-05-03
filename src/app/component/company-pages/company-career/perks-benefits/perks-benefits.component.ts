import { Component } from '@angular/core';

import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';

import { perksBenefits } from '../../../../shared/data/company-pages/company';

@Component({
  selector: 'app-perks-benefits',
  standalone: true,
  imports: [FeatherIconComponent],
  templateUrl: './perks-benefits.component.html',
  styleUrl: './perks-benefits.component.scss'
})

export class PerksBenefitsComponent {

  public perksBenefits = perksBenefits;

}
