import { Component, Input } from '@angular/core';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [FeatherIconComponent, RouterModule],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss'
})

export class ProfileMenuComponent {

  @Input() currentUrl: string;

}
