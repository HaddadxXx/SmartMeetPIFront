import { Component, Input } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FeatherIconComponent } from '../../feather-icon/feather-icon.component';
import { LikePanelComponent } from '../../posts/like-panel/like-panel.component';
import { PostHeaderComponent } from '../../posts/post-header/post-header.component';
import { PostReactComponent } from '../../posts/post-react/post-react.component';
import { CommentComponent } from './comment/comment.component';

import { profile } from '../../../../interface/post';

import { ClickOutSideDirective } from '../../../../directives/click-out-side.directive';

@Component({
  selector: 'app-open-modal',
  standalone: true,
  imports: [FeatherIconComponent, PostHeaderComponent, LikePanelComponent,
    PostReactComponent,CommentComponent,CarouselModule,ClickOutSideDirective],
  templateUrl: './open-modal.component.html',
  styleUrl: './open-modal.component.scss'
})

export class OpenModalComponent {

  public isShow:boolean = false;
 
  @Input() data: profile;

  constructor(public modalServices :NgbModal){}

  public storyOptions= {
    loop: false,
    margin: 20,
    autoplay: false,
    autoplayTimeout: 1000,
    autoplayHoverPause: false,
    dots: false,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  public carousalData = [
    {
      image: 'assets/images/post/15.jpg'
    },
    {
      image: 'assets/images/post/16.jpg'
    },
    {
      image: 'assets/images/post/17.jpg'
    },
  ]
 
  clickOutside(){
    this.isShow = false;
  }



}
