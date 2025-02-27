import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { CommonWeatherComponent } from '../../common/common-weather/common-weather.component';
import { FriendSuggestionComponent } from '../../common/friend-suggestion/friend-suggestion.component';
import { FriendsConversationComponent } from '../../common/friends-conversation/friends-conversation.component';
import { HeaderComponent } from '../../common/header/header.component';
import { LikedPagesComponent } from '../../common/liked-pages/liked-pages.component';
import { ProfileBoxComponent } from '../../common/profile-box/profile-box.component';
import { SidebarThreeComponent } from '../../sidebar/sidebar-three/sidebar-three.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { ThemeSettingsComponent } from '../../theme-settings/theme-settings.component';

import { CommonService } from '../../../services/common.service';
import { SettingBoxComponent } from '../../theme-settings/setting-box/setting-box.component';
import { ClickOutSideDirective } from '../../../directives/click-out-side.directive';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [SidebarComponent, FriendsConversationComponent, SettingBoxComponent,
    ThemeSettingsComponent, HeaderComponent, ProfileBoxComponent,ClickOutSideDirective,
    FriendSuggestionComponent, LikedPagesComponent, SidebarThreeComponent,
    CommonWeatherComponent, LikedPagesComponent, RouterModule, CommonModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})

export class ContentComponent {

  public currentUrl: string;
  public isShow: boolean;
  constructor(private router: Router, public commonServices: CommonService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        window.scrollTo(0, 0);
      }
    });
  }

  getClass() {
    let pageBody = '';
    let pageHeader = '';
    let pageSidebar = '';
    let pagePanel = '';
    let pageCenter = '';
    if (this.currentUrl === "/news-feed-layout/style-1" || this.currentUrl === "/") {
      pageBody = 'custom-padding';
    } else if (this.currentUrl === "/news-feed-layout/style-2") {
      pageHeader = 'header-light';
      pageSidebar = 'sidebar-white';
      pageBody = 'custom-padding'
    } else if (this.currentUrl === "/news-feed-layout/style-3") {
      pageBody = 'newsfeed-style1';
      pageSidebar = 'panel-lg';
    } else if (this.currentUrl === "/news-feed-layout/style-4") {
      pageBody = 'newsfeed-style2';
      pageSidebar = 'panel-lg';
      pagePanel = 'd-none';
    } else if (this.currentUrl === "/news-feed-layout/style-5") {
      pageBody = 'custom-padding newsfeed-style7';
      pagePanel = 'panel-xs';
      pageCenter = 'page-lg';
    }
    else if (this.currentUrl === "/news-feed-layout/style-6") {
      pageBody = 'custom-padding newsfeed-style3';
      pageSidebar = 'd-none';
    }
    else if (this.currentUrl === "/news-feed-layout/style-7") {
      pageBody = 'custom-padding newsfeed-style4';
      pageSidebar = 'd-none';
      pagePanel = 'd-none';
    }
    else if (this.currentUrl === "/news-feed-layout/style-8") {
      pageBody = 'custom-padding newsfeed-style3 width-style style-8-page';
      pageSidebar = 'panel-lg fixed-sidebar';
      pagePanel = 'd-none';
    }
    else if (this.currentUrl === "/news-feed-layout/style-9") {
      pageBody = 'newsfeed-style5';
      pageSidebar = 'sidebar-light panel-lg';
    }
    else if (this.currentUrl === "/news-feed-layout/style-10") {
      pageBody = 'newsfeed-style6';
      pageSidebar = 'panel-lg';
    }
    else if (this.currentUrl === "/news-feed-layout/style-11") {
      pageBody = 'newsfeed-style6 custom-padding single-post';
    }
    else if (this.currentUrl === "/news-feed-layout/style-12") {
      pageBody = 'newsfeed-style custom-padding';
      pagePanel = 'panel-xs';
    }

    else if (this.currentUrl === "/profile/timeline") {
      pageBody = 'custom-padding profile-page';
    }
    else if (this.currentUrl === "/profile/about") {
      pageBody = 'custom-padding profile-page profile-page-about';
    }
    else if (this.currentUrl === "/profile/friends") {
      pageBody = 'custom-padding profile-page profile-page-friend';
    }
    else if (this.currentUrl === "/profile/gallery") {
      pageBody = 'custom-padding profile-page profile-page-friend';
    }
    else if (this.currentUrl === "/profile/activity-feed") {
      pageBody = 'custom-padding profile-page';
    }
    else if (this.currentUrl === "/profile/tab") {
      pageBody = 'custom-padding profile-page';
    }
    else if (this.currentUrl === "/profile/friend-profile") {
      pageBody = 'custom-padding profile-page';
    }

    else if (this.currentUrl === "/favorite/page-listing") {
      pageBody = 'custom-padding event-page';
    }
    else if (this.currentUrl === "/favorite/page-home") {
      pageBody = 'custom-padding custom-padding favourite-page-body';
    }
    else if (this.currentUrl === "/favorite/about") {
      pageBody = 'custom-padding custom-padding favourite-page-body';
    }
    else if (this.currentUrl === "/favorite/review") {
      pageBody = 'custom-padding favourite-page-body';
    }
    else if (this.currentUrl === "/favorite/gallery") {
      pageBody = 'custom-padding profile-page profile-page-friend';
    }
    else if (this.currentUrl === "/favorite/tab") {
      pageBody = 'custom-padding favourite-page-body';
    }

    else if (this.currentUrl === "/others/event-calendar") {
      pageBody = 'custom-padding event-page';
    }
    else if (this.currentUrl === "/others/birthday") {
      pageBody = 'custom-padding birthday-page';
    }
    else if (this.currentUrl === "/others/weather") {
      pageBody = 'custom-padding weather-page';
    }
    else if (this.currentUrl === "/others/music") {
      pageBody = 'custom-padding music-page';
    }
    else if (this.currentUrl === "/others/games") {
      pageBody = 'custom-padding game-page';
    }
    else if (this.currentUrl === "/others/tab") {
      pageBody = 'custom-padding favourite-page-body';
    }

    return { body: pageBody, header: pageHeader, sidebar: pageSidebar, panel: pagePanel, center: pageCenter }
  }

}
