import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { FeatherIconComponent } from '../feather-icon/feather-icon.component';

import { CommonService } from '../../../services/common.service';

import { ClickOutSideDirective } from '../../../directives/click-out-side.directive';
import { likedPages } from '../../../interface/common';

@Component({
  selector: 'app-liked-pages',
  templateUrl: './liked-pages.component.html',
  styleUrl: './liked-pages.component.scss',
  imports: [FeatherIconComponent, CommonModule, ClickOutSideDirective],
  standalone: true
})

export class LikedPagesComponent {

  public isShow: boolean = false;
  public likedPages: likedPages[];
  @Input() currentUrl: string;
  @Input() rating: boolean;

  constructor(
    public commonService: CommonService) {
  }

  ngOnInit() {
    this.commonService.likedPages().subscribe(response => {
      this.likedPages = response.likedPages;
    })
  }

  items(item: likedPages) {
    return item.favorite = !item.favorite;
  }

  outSideClose() {
    this.isShow = false;
  }

}
