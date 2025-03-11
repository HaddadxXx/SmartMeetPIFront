import { Component,Input } from '@angular/core';
import { SvgIconComponent } from '../../../../shared/components/common/svg-icon/svg-icon.component';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';
import { profile, socialMediaFavorite } from '../../../../shared/data/favorite-page/favorite-page';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../../../shared/services/group.service';
@Component({
  selector: 'app-page-cover',
  standalone: true,
  imports: [FeatherIconComponent,SvgIconComponent,CommonModule],
  templateUrl: './page-cover.component.html',
  styleUrl: './page-cover.component.scss'
})

export class PageCoverComponent {
 // Propriété d'entrée pour recevoir l'objet group
 @Input() group: any;

  public profile = profile;
  public socialMedia = socialMediaFavorite;

  public openTab: string = "home";
  constructor( private groupService: GroupService) {}
  changeTab(val: string) {
    this.openTab = val;
  }



  getGroupImage(photo: string): string {
  
    return photo ? `url('http://localhost:8080/uploads/${photo}')` : `url('http://localhost:8080/uploads/default.png')`;
  }

}
