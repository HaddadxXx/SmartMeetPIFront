import { Component, Renderer2 } from '@angular/core';
import { CommonWeatherComponent } from '../../../shared/components/common/common-weather/common-weather.component';
import { CreatePostComponent } from '../../../shared/components/common/create-post/create-post.component';
import { FriendSuggestionComponent } from '../../../shared/components/common/friend-suggestion/friend-suggestion.component';
import { LikedPagesComponent } from '../../../shared/components/common/liked-pages/liked-pages.component';
import { PostDetailsComponent } from '../../../shared/components/common/posts/post-details/post-details.component';
import { PostHeaderComponent } from '../../../shared/components/common/posts/post-header/post-header.component';
import { StroyComponent } from '../../../shared/components/common/stroy/stroy.component';
import { SkeletonStyle8Component } from '../../../shared/skeleton-loader/news-feed-layout-skeleton/skeleton-style-8/skeleton-style-8.component';

import { CommonService } from '../../../shared/services/common.service';
import { PostService } from '../../../shared/services/news-feed-layout/post.service';

import { profileDataSection } from '../../../shared/interface/post';

@Component({
  selector: 'app-style-8',
  standalone: true,
  imports: [StroyComponent, CreatePostComponent, PostHeaderComponent,
    PostDetailsComponent, FriendSuggestionComponent, LikedPagesComponent,
    CommonWeatherComponent, SkeletonStyle8Component],
  templateUrl: './style-8.component.html',
  styleUrl: './style-8.component.scss'
})

export class Style8Component {

  public visiblePosts: profileDataSection[];
  public post: profileDataSection[];
  public displayCount: number = 5;
  public isCreatePost: boolean = true;

  constructor(public postServices: PostService,
    public commonServices: CommonService,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.postServices.style8().subscribe(response => {
      if (response.style8) {
        this.post = response.style8;
        this.visiblePosts = this.post.slice(0, this.displayCount);
        this.post.filter((element) => {
          element.children.forEach((data, index) => {
            index === 0 ? data.active = true : data.active = false;
          })
        }); 
      }
    })
    document.body.classList.add('bg-smile')
  } 

  ngDoCheck(){
    if(this.commonServices.isSidebar === true){
      this.renderer.addClass(document.body, 'sidebar-overlay')
    }
  }

  refresh() {
    this.displayCount = Math.min(this.displayCount + 1);
    this.visiblePosts = this.post.slice(0, this.displayCount);
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-smile')
    this.renderer.removeClass(document.body, 'sidebar-overlay')
  }

}
