import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { SvgIconComponent } from '../../../shared/components/common/svg-icon/svg-icon.component';
import { CommonService } from '../../../shared/services/common.service';
import { LoadingComponent } from '../../../shared/skeleton-loader/widgets/loading/loading.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SvgIconComponent, FeatherIconComponent,LoadingComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  
  constructor(public commonServices : CommonService) {}
  public show: boolean = false;
  
}
