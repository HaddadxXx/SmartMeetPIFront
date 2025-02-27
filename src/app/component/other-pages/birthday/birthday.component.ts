import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BirthdaySectionComponent } from '../../../shared/components/common/birthday-section/birthday-section.component';
import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { FriendSuggestionComponent } from '../../../shared/components/common/friend-suggestion/friend-suggestion.component';
import { ProfileBoxComponent } from '../../../shared/components/common/profile-box/profile-box.component';
import { BirthdaySkeletonComponent } from '../../../shared/skeleton-loader/others-pages-skeleton/birthday-skeleton/birthday-skeleton.component';

import { ClickOutSideDirective } from '../../../shared/directives/click-out-side.directive';
import { BirthdayService } from '../../../shared/services/birthday.service';
import { CommonService } from '../../../shared/services/common.service';

import { birthdayClass } from '../../../shared/data/common';
import { birthdayList } from '../../../shared/interface/birthday';

@Component({
  selector: 'app-birthday',
  standalone: true,
  imports: [CommonModule, ProfileBoxComponent, FriendSuggestionComponent,
    BirthdaySkeletonComponent, FeatherIconComponent, BirthdaySectionComponent,
    RouterModule, ClickOutSideDirective],
  templateUrl: './birthday.component.html',
  styleUrl: './birthday.component.scss'
})

export class BirthdayComponent {

  public isShow: boolean = false;
  public birthdayData: birthdayList[];
  public birthdayClass = birthdayClass;

  constructor(public birthdayServices: BirthdayService,
    public commonServices: CommonService) {}

  ngOnInit() {
    this.birthdayServices.birthday().subscribe(response => {
      if (response.birthdayList) {
        this.birthdayData = response.birthdayList;
      }
    })
  }

  outSideClose() {
    this.isShow = false;
  }
}
