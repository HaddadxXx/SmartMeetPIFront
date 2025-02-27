import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FeatherIconComponent } from '../../../../../shared/components/common/feather-icon/feather-icon.component';
import { BrandLogoComponent } from '../../../../../shared/components/common/header/widgets/brand-logo/brand-logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FeatherIconComponent, BrandLogoComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {

  public isMenu: boolean = false;
  @Input() currentUrl: string;

  constructor(public router: Router) { }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl("/auth/login");
  }

}
