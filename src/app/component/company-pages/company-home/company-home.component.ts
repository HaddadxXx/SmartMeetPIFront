import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { BrandLogoComponent } from '../../../shared/components/common/header/widgets/brand-logo/brand-logo.component';
import { LoadingComponent } from '../../../shared/skeleton-loader/widgets/loading/loading.component';
import { FooterComponent } from '../../widgets/footer/footer.component';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { BlogSectionComponent } from './blog-section/blog-section.component';
import { FindNewFriendsComponent } from './find-new-friends/find-new-friends.component';
import { HomeSectionComponent } from './home-section/home-section.component';
import { OurFeaturesComponent } from './our-features/our-features.component';
import { RegisterFriendbookComponent } from './register-friendbook/register-friendbook.component';
import { RegisterSectionComponent } from './register-section/register-section.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { HeaderComponent } from './widgets/header/header.component';

@Component({
  selector: 'app-company-home',
  standalone: true,
  imports: [BrandLogoComponent, FeatherIconComponent, OurFeaturesComponent,
    RegisterFriendbookComponent, FindNewFriendsComponent, ActiveUsersComponent,
    BlogSectionComponent, RegisterSectionComponent, FooterComponent, HeaderComponent,
    HomeSectionComponent, LoadingComponent, TestimonialComponent, RouterModule],
  templateUrl: './company-home.component.html',
  styleUrl: './company-home.component.scss'
})

export class CompanyHomeComponent {

  ngOnInit() {
    document.body.classList.add('bg-white');
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-white');
  }

}
