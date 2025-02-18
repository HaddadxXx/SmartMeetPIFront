import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { FeatherIconComponent } from '../../feather-icon/feather-icon.component';
import { DetailBoxComponent } from '../detail-box/detail-box.component';
import { LikePanelComponent } from '../like-panel/like-panel.component';
import { PostReactComponent } from '../post-react/post-react.component';
import { GallerySectionComponent } from './gallery-section/gallery-section.component';

import { CommonService } from '../../../../services/common.service';

import { profile } from '../../../../interface/post';
import { GoogleMapComponent } from './google-map/google-map.component';

@Component({
  selector: 'app-post-details',
templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
  imports: [GoogleMapComponent, FeatherIconComponent, DetailBoxComponent, LikePanelComponent, 
    PostReactComponent, CarouselModule, GallerySectionComponent, CommonModule],
  standalone: true
})

export class PostDetailsComponent {

  @Input() postData: profile;
  public sanitizedUrl: SafeResourceUrl;
  
  constructor(public commonService: CommonService, public sanitizer: DomSanitizer){}

  ngOnInit(){
    this.sanitizeUrl(this.postData?.isUrl);
  }

  public storyOptions = {
    loop: true,
    margin: 20,
    autoplay: false,
    autoplayTimeout: 1000,
    autoplayHoverPause: false,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 1.5,
      },
      400: {
        items: 2.5,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 8,
      },
    },
  };

  sanitizeUrl(url: string) {
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
 
}
