import { Component, Input } from '@angular/core';
import { BrandLogoComponent } from '../../../shared/components/common/header/widgets/brand-logo/brand-logo.component';
import { SearchBoxComponent } from '../../../shared/components/common/header/widgets/search-box/search-box.component';
import { Router, RouterModule } from '@angular/router';
import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { ModeComponent } from '../../../shared/components/common/header/widgets/mode/mode.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BrandLogoComponent,SearchBoxComponent,
    FeatherIconComponent,ModeComponent,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {

  @Input() currentUrl :string;

  constructor(public router: Router) {}

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl("/auth/login");
  }

}
