import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../../shared/services/common.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupService } from '../../../shared/services/group.service';
import { PageListSkeletonComponent } from '../../../shared/skeleton-loader/favorite-pages-skeleton/page-list-skeleton/page-list-skeleton.component';
import { ListBoxComponent } from './list-box/list-box.component';
import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { ClickOutSideDirective } from '../../../shared/directives/click-out-side.directive';
import { tab } from '../page-listing/page-listing.component';
import { pageListing } from '../../../shared/data/favorite-page/favorite-page';
import { MatDialog,MatDialogRef  } from '@angular/material/dialog';
import { GroupPopupComponent } from '../group-listing/group-popup/group-popup.component';  // Importer le composant de popup

@Component({
  selector: 'app-group-listing',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FeatherIconComponent,
    ListBoxComponent,
    PageListSkeletonComponent,
    ClickOutSideDirective,
    GroupPopupComponent 
  ],
  templateUrl: './group-listing.component.html',
  styleUrls: ['./group-listing.component.scss']
})
export class GroupListingComponent {
  public isShow: boolean = false;
  public pageListing = pageListing;
  public currentUrl: string;
   showPopup = false;
   private dialogRef: MatDialogRef<GroupPopupComponent> | null = null; // Déclaration correcte


  constructor(
    public commonServices: CommonService,
    private router: Router,
    public dialog: MatDialog  // Injection de MatDialog
  ) {
    this.currentUrl = this.router.url;
  }

  public tabData : tab[] = [
    {
      tab: 'top suggestions',
    },
    {
      tab: 'invitation',
    },
    {
      tab: 'followed groups',
      
    },
    {
      tab: 'your groups',
      class: 'active'
    },
    {
      tab: 'create group',
      class: 'd-xl-none d-inline-block'
    },
  ]

  outSideClose() {
    this.isShow = false;
  }


  // Gère le clic sur un onglet
  onTabClick(tabName: string): void {
    if (tabName === 'create group') {
      console.log('it works')
      this.openGroupPopup(); // Appeler la méthode pour ouvrir le popup
    }
  }

 
   // Ouvre le popup modal
   openGroupPopup(): void {
    const dialogRef = this.dialog.open(GroupPopupComponent, {
      width: '500px', // Largeur du modal
      disableClose: true, // Empêche la fermeture du modal en cliquant à l'extérieur ou en appuyant sur Échap
    });

    // Écoutez l'événement après la fermeture du modal
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Le groupe a été créé avec succès !', result);
        
      }
    });
  }
// Ferme le popup modal
closeGroupPopup(): void {
  if (this.dialogRef) {
    this.dialogRef.close();
  }



}
}

























 // Gère la création d'un groupe
  // onGroupCreated(): void {
  //   this.showPopup = false; // Ferme le popup
  //   console.log('Le groupe a été créé avec succès !');
  //   // Vous pouvez également rafraîchir la liste des groupes ici si nécessaire
  //  }