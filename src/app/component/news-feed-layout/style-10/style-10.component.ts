import { Component, Input } from '@angular/core';
import { CreatePostComponent } from '../../../shared/components/common/create-post/create-post.component';
import { PostDetailsComponent } from '../../../shared/components/common/posts/post-details/post-details.component';
import { PostHeaderComponent } from '../../../shared/components/common/posts/post-header/post-header.component';

import { PostService } from '../../../shared/services/news-feed-layout/post.service';
import { CommonService } from '../../../shared/services/common.service';

import { profileDataSection } from '../../../shared/interface/post';
import { event } from '../../../shared/data/common';
import { SkeletonStyle10Component } from '../../../shared/skeleton-loader/news-feed-layout-skeleton/skeleton-style-10/skeleton-style-10.component';

@Component({
  selector: 'app-style-10',
  standalone: true,
  imports: [PostHeaderComponent, PostDetailsComponent,CreatePostComponent
    ,SkeletonStyle10Component],
  templateUrl: './style-10.component.html',
  styleUrl: './style-10.component.scss'
})

export class Style10Component {

  public isCreatePost: boolean = true;
  public event = event;
  public post: profileDataSection[];

  constructor(public postServices: PostService , public commonServices: CommonService) { }

  ngOnInit() {
    this.postServices.style10().subscribe((data) => {
      if (data.style10) {
        this.post = data.style10;
        this.post.filter((element) => {
          element.children.forEach((data, index) => {
            index === 0 ? data.active = true : data.active = false;
          })
        });
      }
    });
    document.documentElement.style.setProperty('--theme-color', '82, 128, 164');
    document.documentElement.style.setProperty('--theme-light', '241, 245, 248');
  }

  ngDoCheck() {
    this.commonServices.dark ? document.body.classList.add('dark-2') : document.body.classList.remove('dark-2');
    this.commonServices.dark ? document.body.classList.remove('dark') : this.commonServices.dark;
  }

  ngOnDestroy() {
    document.documentElement.style.removeProperty('--theme-color');
    document.documentElement.style.removeProperty('--theme-light');
    document.body.classList.remove('dark-2');
  }

}
