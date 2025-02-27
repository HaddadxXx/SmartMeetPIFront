import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { VideoPlayerComponent } from '../components/common/events/video-player/video-player.component';
import { friend, friendsConversation, gallery, liked, storySlider } from '../interface/common';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  public urls = 'https://www.youtube.com/embed/TKnufs85hXk';
  public popoverData = { image: '', title: '' }
  public isShow: boolean = false;
  public isSidebar : boolean = false;
  public isSkeleton: boolean;
  public dark: boolean = false;

  constructor(public modalServices: NgbModal, private http: HttpClient, private router: Router) {
    this.router.events.subscribe(() => {
      setTimeout(() => {
        this.isSkeleton = true;
      }, 2000)
      this.isSkeleton = false;
    });
  }

  videoPlay(url: string) {
    const modalRef = this.modalServices.open(VideoPlayerComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.url = url;
  }

  changeMode() {
    this.dark = !this.dark;
    if (this.dark) {
       document.body.classList.add('dark');
    } else {
       document.body.classList.remove('dark');
    }
  }

  toggle(popover: NgbPopover, images: string, title: string) {
    this.isShow = true;
    popover.open({ images, title });
    this.popoverData.image = images;
    this.popoverData.title = title;
  }

  friendsConversation(): Observable<friendsConversation> {
    return this.http.get<friendsConversation>('assets/data/friends-conversation.json');
  }

  story(): Observable<storySlider> {
    return this.http.get<storySlider>('assets/data/story-slider.json');
  }

  gallery(): Observable<gallery> {
    return this.http.get<gallery>('assets/data/gallery.json')
  }

  friendSuggestion(): Observable<friend> {
    return this.http.get<friend>('assets/data/friend-suggestion.json');
  }

  likedPages(): Observable<liked> {
    return this.http.get<liked>('assets/data/likedPages.json');
  }

}
