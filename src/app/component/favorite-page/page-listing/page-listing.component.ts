import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { ListBoxComponent } from './list-box/list-box.component';

import { ClickOutSideDirective } from '../../../shared/directives/click-out-side.directive';

import { CommonService } from '../../../shared/services/common.service';

import { Router } from '@angular/router';
import { pageListing } from '../../../shared/data/favorite-page/favorite-page';
import { PageListSkeletonComponent } from '../../../shared/skeleton-loader/favorite-pages-skeleton/page-list-skeleton/page-list-skeleton.component';

export interface tab {
  class?: string;
  tab: string
}

@Component({
  selector: 'app-page-listing',
  standalone: true,
  imports: [FeatherIconComponent, CommonModule, ListBoxComponent,PageListSkeletonComponent,ClickOutSideDirective],
  templateUrl: './page-listing.component.html',
  styleUrl: './page-listing.component.scss'
})

export class PageListingComponent {

  public isShow: boolean = false;
  public pageListing = pageListing;
  public currentUrl: string;

  constructor(public commonServices: CommonService,private router: Router){
    this.currentUrl = this.router.url;
  }
  
  public tabData : tab[] = [
    {
      tab: 'top suggestions',
    },
    {
      tab: 'invitation',
    },
    {
      tab: 'followed pages',
      class: 'active'
    },
    {
      tab: 'your pages',
    },
    {
      tab: 'create page',
      class: 'd-xl-none d-inline-block'
    },
  ]

  outSideClose() {
    this.isShow = false;
  }
}
