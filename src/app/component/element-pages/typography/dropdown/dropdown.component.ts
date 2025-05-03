import { Component } from '@angular/core';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';
import { ClickOutSideDirective } from '../../../../shared/directives/click-out-side.directive';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [FeatherIconComponent,ClickOutSideDirective],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})

export class DropdownComponent {

  public isShow : boolean = false;
  public isOpen: boolean = false;

}
