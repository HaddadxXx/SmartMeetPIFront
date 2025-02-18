import { Component } from '@angular/core';
import { ClickOutSideDirective } from '../../../../../directives/click-out-side.directive';
import { FeatherIconComponent } from '../../../feather-icon/feather-icon.component';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [FeatherIconComponent, ClickOutSideDirective],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})

export class SearchBoxComponent {

  public isOpen: boolean = false;

  outSideClose() {
    this.isOpen = false;
  }

}
