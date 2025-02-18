import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { BlogFilterComponent } from './blog-filter/blog-filter.component';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';

import { blogData } from '../../../../shared/data/company-pages/company';

@Component({
  selector: 'app-company-blog-section',
  standalone: true,
  imports: [FeatherIconComponent,BlogFilterComponent,CommonModule],
  templateUrl: './company-blog-section.component.html',
  styleUrl: './company-blog-section.component.scss'
})

export class CompanyBlogSectionComponent {

  public blogData = blogData ;

}
