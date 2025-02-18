import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { CommonService } from '../../../services/common.service';

import { FeatherIconComponent } from '../feather-icon/feather-icon.component';

import { friendSuggestion } from '../../../interface/common';
import { ClickOutSideDirective } from '../../../directives/click-out-side.directive';

@Component({
  selector: 'app-friend-suggestion',
  templateUrl: './friend-suggestion.component.html',
  styleUrl: './friend-suggestion.component.scss',
  imports: [FeatherIconComponent,CommonModule,CarouselModule,ClickOutSideDirective],
  standalone:true
})

export class FriendSuggestionComponent {

  public isShow: boolean = false;
  public friendSuggestion: friendSuggestion[];

  public friendSuggestionOptions = {
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: false,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  };

  constructor(public commonServices :CommonService) {}

  ngOnInit() {
    this.commonServices.friendSuggestion().subscribe(response => {
      if (response.friendSuggestion) {
        this.friendSuggestion = response.friendSuggestion;
      }
    })
  }

  outSideClose(){
    this.isShow = false;
  }
}
