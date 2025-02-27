import { Component } from '@angular/core';

import { allSvg } from '../../../../shared/data/element-pages/icon';

@Component({
  selector: 'app-all-svg',
  standalone: true,
  imports: [],
  templateUrl: './all-svg.component.html',
  styleUrl: './all-svg.component.scss'
})

export class AllSvgComponent {

  public allSvg = allSvg ;

}
