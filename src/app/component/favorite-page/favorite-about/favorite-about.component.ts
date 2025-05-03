import { Component } from '@angular/core';

import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { HobbiesInterestComponent } from '../../../shared/components/common/hobbies-interest/hobbies-interest.component';
import { PageCoverComponent } from '../widgets/page-cover/page-cover.component';
import { ProfileMenuComponent } from '../widgets/profile-menu/profile-menu.component';
import { AboutProfileBoxComponent } from './about-profile-box/about-profile-box.component';

import { CommonService } from '../../../shared/services/common.service';
import { GroupService } from '../../../shared/services/group.service';
import { Router,ActivatedRoute } from '@angular/router';
import { hobbyInterestSingle } from '../../../shared/data/favorite-page/favorite-page';
import { PageAboutSkeletonComponent } from '../../../shared/skeleton-loader/favorite-pages-skeleton/page-about-skeleton/page-about-skeleton.component';

@Component({
  selector: 'app-favorite-about',
  standalone: true,
  imports: [PageCoverComponent, ProfileMenuComponent, AboutProfileBoxComponent,PageAboutSkeletonComponent,
    FeatherIconComponent, HobbiesInterestComponent],
  templateUrl: './favorite-about.component.html',
  styleUrl: './favorite-about.component.scss'
})

export class FavoriteAboutComponent {

  public currentUrl: string;
  public hobbyInterest = hobbyInterestSingle;


  public groupId!: string;
  public groupData: any; // tu peux créer une interface si tu veux

  constructor(
    public commonServices: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupService
  ) {
    this.currentUrl = this.router.url;
  }

  ngOnInit() {
    // Récupérer l'ID du groupe depuis l'URL
    this.groupId = this.route.snapshot.paramMap.get('groupId')!;

    // Appeler le service pour récupérer les données du groupe
    this.groupService.getGroupById(this.groupId).subscribe(
      (data) => {
        this.groupData = data;
        console.log("Données rass du groupe:", this.groupData);
      },
      (error) => {
        console.error("Erreur lors de la récupération du groupe :", error);
      }
    );
  }



}
