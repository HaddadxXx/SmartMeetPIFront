import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../services/common.service';
import { SettingBoxComponent } from './setting-box/setting-box.component';
import { ClickOutSideDirective } from '../../directives/click-out-side.directive';

@Component({
  selector: 'app-theme-settings',
  standalone: true,
  imports: [SettingBoxComponent, NgbModule, FormsModule,ClickOutSideDirective],
  templateUrl: './theme-settings.component.html',
  styleUrl: './theme-settings.component.scss'
})

export class ThemeSettingsComponent {

  public tabData: string = 'rtl';
  public isOpenMenu: boolean = false;

  constructor(public commonServices :CommonService){}

  changeLayoutType(direction: string) {
    if (direction == "rtl") {
      document.body.classList.add('rtl');
      this.tabData = 'ltr';
    } else {
      document.body.classList.remove('rtl');
      this.tabData = 'rtl';
    }
  }

  isFalse(value: boolean) {
    this.isOpenMenu = value;
  }
}
