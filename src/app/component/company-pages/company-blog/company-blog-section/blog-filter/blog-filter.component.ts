import { Component } from '@angular/core';

import { FeatherIconComponent } from '../../../../../shared/components/common/feather-icon/feather-icon.component';

import { blogCategory, popularPost, popularTags } from '../../../../../shared/data/company-pages/company';

@Component({
  selector: 'app-blog-filter',
  standalone: true,
  imports: [FeatherIconComponent],
  templateUrl: './blog-filter.component.html',
  styleUrl: './blog-filter.component.scss'
})

export class BlogFilterComponent {

  public popularPost = popularPost ;
  public popularTags = popularTags ;
  public blogCategory = blogCategory ;

}
