import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface navItems {
  path ?: string;
  icons?: string;
  title?: string;
  iconType?: string;
  class?:string;
  active?:boolean
}

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor() { }
//first
  menuItems :navItems[] = [
    {
      path: 'news-feed-layout/style-1',
      icons: 'file',
      title: 'newsfeed',
      iconType: 'feather'
    },
    {
      path: 'favorite/page-home',
      icons: 'star',
      title: 'Favourite',
      iconType: 'feather'
    },
    {
      path: '',
      icons: 'users',
      title: 'Groups',
      iconType: 'feather'
    },
    {
      path: 'others/music',
      icons: 'headphones',
      title: 'Music',
      iconType: 'feather'
    },
    {
      path: 'others/weather',
      icons: 'cloud',
      title: 'Weather',
      iconType: 'feather'
    },
    {
      path: 'others/event-calendar',
      icons: 'calendar',
      title: 'Event',
      iconType: 'feather'
    },
    {
      path: 'others/birthday',
      icons: 'cake',
      title: 'Birthday',
      class:'bar-icon fill-white'
    },
    {
      path: 'others/games',
      icons: 'game-controller',
      title: 'Games',
      class:'bar-icon fill-white'
    },
  ]
  items = new BehaviorSubject<any>(this.menuItems);

//second
  menuItemsSecond :navItems []=[
    {
      icons: 'assets/svg/sidebar-vector/news.svg',
      title: 'newsfeed',
      active:true,
    },
    {
      icons: 'assets/svg/sidebar-vector/star.svg',
      title: 'favourite',
    },
    {
      icons: 'assets/svg/sidebar-vector/friends.svg',
      title: 'group',
    },
    {
      icons: 'assets/svg/sidebar-vector/headphones.svg',
      title: 'music & video',
    },
    {
      icons: 'assets/svg/sidebar-vector/sky.svg',
      title: 'weather',
    },
    {
      icons: 'assets/svg/sidebar-vector/calendar.svg',
      title: 'calender',
    },
    {
      icons: 'assets/svg/sidebar-vector/cake-pop.svg',
      title: 'events',
    },
    {
      icons: 'assets/svg/sidebar-vector/games.svg',
      title: 'games',
    },
    {
      icons: 'assets/svg/sidebar-vector/comment.svg',
      title: 'news',
    },
    {
      icons: 'assets/svg/sidebar-vector/youtube.svg',
      title: 'live streams',
    },
    {
      icons: 'assets/svg/sidebar-vector/cart.svg',
      title: 'shop',
    },
  ]
  itemsSecond = new BehaviorSubject<any[]>(this.menuItemsSecond);

//third
  menuItemsThird : navItems[] = [
    {
      icons: 'file',
      title: 'newsfeed',
      iconType: 'feather',
      active:true,
    },
    {
      icons: 'headphones',
      title: 'music & video',
      iconType: 'feather',
    },
    {
      icons: 'cloud',
      title: 'weather',
      iconType: 'feather',
    },
    {
      icons: 'calendar',
      title: 'calender',
      iconType: 'feather',
    },
    {
      icons: 'cake',
      title: 'Birthday',
      class:'bar-icon fill-white'
    },
    {
      icons: 'game-controller',
      title: 'Games',
      class:'bar-icon fill-white'
    },
  ]
  itemsThird = new BehaviorSubject<any>(this.menuItemsThird);

//four
  menuItemsMobile : navItems[] = [
    {
      path: 'news-feed-layout/style-1',
      icons: 'file',
      title: 'newsfeed',
      iconType: 'feather'
    },
    {
      path: 'favorite/page-home',
      icons: 'star',
      title: 'Favourite',
      iconType: 'feather'
    },
    {
      path: '',
      icons: 'users',
      title: 'Groups',
      iconType: 'feather'
    },
    {
      path: 'others/music',
      icons: 'headphones',
      title: 'Music',
      iconType: 'feather'
    },
    {
      path: 'others/weather',
      icons: 'cloud',
      title: 'Weather',
      iconType: 'feather'
    },
    {
      path: 'others/event-calendar',
      icons: 'calendar',
      title: 'calender',
      iconType: 'feather'
    },
    {
      path: 'others/birthday',
      icons: 'cake',
      title: 'Event',
      class:'bar-icon'
    },
    {
      path: 'others/games',
      icons: 'game-controller',
      title: 'Games',
      class:'bar-icon'
    },
  ]
  itemsMobile = new BehaviorSubject<any>(this.menuItemsMobile);
}



