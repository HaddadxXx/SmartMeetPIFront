import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';

@Component({
  selector: 'app-popover-theme',
  standalone: true,
  imports: [FeatherIconComponent,RouterModule],
  templateUrl: './popover-theme.component.html',
  styleUrl: './popover-theme.component.scss'
})
export class PopoverThemeComponent {

}
