import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FeatherIconComponent,RouterModule,NgbNavModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})

export class MenuComponent {

}
