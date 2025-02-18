import { Component, Input } from '@angular/core';

import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { DetailBoxComponent } from '../../../shared/components/common/posts/detail-box/detail-box.component';
import { LikePanelComponent } from '../../../shared/components/common/posts/like-panel/like-panel.component';
import { PostDetailsBoxComponent } from '../../../shared/components/common/posts/post-details-box/post-details-box.component';
import { PostDetailsComponent } from '../../../shared/components/common/posts/post-details/post-details.component';
import { PostHeaderComponent } from '../../../shared/components/common/posts/post-header/post-header.component';
import { PostReactComponent } from '../../../shared/components/common/posts/post-react/post-react.component';
import { PageCoverComponent } from '../widgets/page-cover/page-cover.component';
import { ProfileMenuComponent } from '../widgets/profile-menu/profile-menu.component';
import { ReviewSectionComponent } from './review-section/review-section.component';

import { FavoritePagesService } from '../../../shared/services/favorite-pages.service';
import { CommonService } from '../../../shared/services/common.service';

import { profile } from '../../../shared/interface/post';
import { Router } from '@angular/router';
import { PageReviewsSkeletonComponent } from '../../../shared/skeleton-loader/favorite-pages-skeleton/page-reviews-skeleton/page-reviews-skeleton.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [PageCoverComponent,ProfileMenuComponent,ReviewSectionComponent,
    DetailBoxComponent,PostDetailsBoxComponent,FeatherIconComponent,
    PostReactComponent,PostHeaderComponent,LikePanelComponent,PageReviewsSkeletonComponent,
    PostDetailsComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})

export class ReviewComponent {

  public post: profile[];
  public currentUrl: string;

  constructor(public favoritePagesService: FavoritePagesService,
    public commonServices: CommonService,
    private router: Router) {
    this.currentUrl = this.router.url;
  }

  ngOnInit() {
    this.favoritePagesService.post().subscribe((data) => {
      this.post = data.reviewPost;
    });
  }

}
