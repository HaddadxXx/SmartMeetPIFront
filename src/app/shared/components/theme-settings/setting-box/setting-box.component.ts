import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { setting } from '../../../interface/setting-box';
import { CommonService } from '../../../services/common.service';
import { SettingBoxService } from '../../../services/setting-box.service';

@Component({
  selector: 'app-setting-box',
  standalone: true,
  imports: [CommonModule, NgbAccordionModule, RouterModule],
  templateUrl: './setting-box.component.html',
  styleUrl: './setting-box.component.scss'
})

export class SettingBoxComponent {

  @Input() isOpenMenu: boolean;
  @Output() childEvent = new EventEmitter<boolean>();
  public title: string;
  public settingBox: setting[];

  constructor(public settingBoxServices: SettingBoxService, public common:CommonService) {}

  ngOnInit() {
    this.settingBoxServices.storyBox().subscribe(response => {
      this.settingBox = response.settingBoxList;
    })
  }

  closeSetting(value: boolean) {
    this.childEvent.emit(value = false);
  }

}
