import { Component, Input } from '@angular/core';
import { StroyComponent } from '../../../shared/components/common/stroy/stroy.component';
import { CreatePostComponent } from '../../../shared/components/common/create-post/create-post.component';
import { PostDetailsComponent } from '../../../shared/components/common/posts/post-details/post-details.component';
import { PostHeaderComponent } from '../../../shared/components/common/posts/post-header/post-header.component';
import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { SkeletonStyle11Component } from '../../../shared/skeleton-loader/news-feed-layout-skeleton/skeleton-style-11/skeleton-style-11.component';

import { PostService } from '../../../shared/services/news-feed-layout/post.service';
import { CommonService } from '../../../shared/services/common.service';

import { profile } from '../../../shared/interface/post';

@Component({
  selector: 'app-style-11',
  standalone: true,
  imports: [StroyComponent, CreatePostComponent, PostDetailsComponent,SkeletonStyle11Component,
    PostHeaderComponent, FeatherIconComponent , ],
  templateUrl: './style-11.component.html',
  styleUrl: './style-11.component.scss'
})

export class Style11Component {

  public displayCount: number = 6;
  public postData: profile[];
  public visiblePosts: profile[];
  public post: profile[];

  constructor(public postServices: PostService , public commonServices: CommonService) { }

  ngOnInit() {
    this.postServices.style11().subscribe(response => {
      if (response.style11) {
        this.post = response.style11;
        this.visiblePosts = this.post.slice(0, this.displayCount);
        this.post.filter((element, index) => {
          index === 0 ? element.active = true : element.active = false;
        });
      }
    })
  }

  refresh() {
    this.displayCount = Math.min(this.displayCount + 1);
    this.visiblePosts = this.post.slice(0, this.displayCount);
  }

}
