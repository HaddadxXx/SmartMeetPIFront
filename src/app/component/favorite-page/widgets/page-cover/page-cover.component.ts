import { Component } from '@angular/core';
import { SvgIconComponent } from '../../../../shared/components/common/svg-icon/svg-icon.component';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';
import { profile, socialMediaFavorite } from '../../../../shared/data/favorite-page/favorite-page';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../../../shared/services/group.service';









@Component({
  selector: 'app-page-cover',
  standalone: true,
  imports: [FeatherIconComponent,SvgIconComponent],
  templateUrl: './page-cover.component.html',
  styleUrl: './page-cover.component.scss'
})

export class PageCoverComponent {

  public profile = profile;
  public socialMedia = socialMediaFavorite;

  /////////

  public groupId!: string;
  public groupData: any; 

  constructor(private route: ActivatedRoute, private groupService: GroupService) {}

  ngOnInit() {
    // Récupérer l'ID du groupe depuis l'URL
    this.groupId = this.route.snapshot.paramMap.get('groupId')!;

    // Appeler le service pour récupérer les données du groupe
    this.groupService.getGroupById(this.groupId).subscribe(
      (data) => {
        this.groupData = data;
        console.log("Données du groupe:", this.groupData);
      },
      (error) => {
        console.error("Erreur lors de la récupération du groupe :", error);
      }
    );
  }

  ///////
  public openTab: string = "home";

  changeTab(val: string) {
    this.openTab = val;
  }

  getGroupImage(photo: string): string {
  
    return photo ? `url('http://localhost:8889/uploads/${photo}')` : `url('http://localhost:8889/uploads/default.png')`;
  }

}
