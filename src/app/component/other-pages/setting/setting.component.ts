import { Component } from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { HeaderOneComponent } from '../../../shared/components/common/header/header-one/header-one.component';
import { LoadingComponent } from '../../../shared/skeleton-loader/widgets/loading/loading.component';
import { DownloadComponent } from '../../widgets/download/download.component';
import { FooterComponent } from '../../widgets/footer/footer.component';
import { SettingHomeComponent } from './setting-home/setting-home.component';
import { SettingPersonalAccountComponent } from './setting-personal-account/setting-personal-account.component';
import { SettingPersonalInfoComponent } from './setting-personal-info/setting-personal-info.component';
import { SettingPersonalNotificationComponent } from './setting-personal-notification/setting-setting-personal-notification.component';
import { SettingPersonalPrivacyComponent } from './setting-personal-privacy/setting-personal-privacy.component';
import { SettingPersonalStoryComponent } from './setting-personal-story/setting-personal-story.component';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [HeaderOneComponent, DownloadComponent, FooterComponent,
    SettingHomeComponent,
    SettingPersonalAccountComponent,
    SettingPersonalInfoComponent,
    SettingPersonalNotificationComponent,
    SettingPersonalPrivacyComponent,
    SettingPersonalStoryComponent,
    FeatherIconComponent, LoadingComponent, RouterModule, RouterLinkActive],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})

export class SettingComponent {

  public isOpenMenu: boolean = false;

}
