import { Component, Input } from '@angular/core';

import { HeaderOneComponent } from './header-one/header-one.component';
import { HeaderTwoComponent } from './header-two/header-two.component';
import { HeaderThreeComponent } from './header-three/header-three.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderOneComponent,HeaderTwoComponent,HeaderThreeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {

  @Input() currentUrl :string;

}
