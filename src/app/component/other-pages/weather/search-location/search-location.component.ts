import { Component } from '@angular/core';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';
import { ClickOutSideDirective } from '../../../../shared/directives/click-out-side.directive';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  imports: [FeatherIconComponent,ClickOutSideDirective],
  standalone: true,
  styleUrl: './search-location.component.scss'
})

export class SearchLocationComponent {

  public isShow: boolean = false;

  outSideClose(){
    this.isShow = false;
 }

}
