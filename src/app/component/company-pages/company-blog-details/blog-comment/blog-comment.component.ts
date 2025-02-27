import { Component } from '@angular/core';

import { blogCategoryComment } from '../../../../shared/data/company-pages/company';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';

@Component({
  selector: 'app-blog-comment',
  standalone: true,
  imports: [FeatherIconComponent],
  templateUrl: './blog-comment.component.html',
  styleUrl: './blog-comment.component.scss'
})

export class BlogCommentComponent {
 
   public  blogCategoryComment = blogCategoryComment;

}
