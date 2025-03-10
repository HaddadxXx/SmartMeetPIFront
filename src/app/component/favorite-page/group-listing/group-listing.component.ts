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

import { AuthService } from '../../../shared/services/auth.service';

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


   groups: any[] = [];


  constructor(
    public commonServices: CommonService,
    private router: Router,
    public dialog: MatDialog , // Injection de MatDialog
    private groupService: GroupService,
    private authService: AuthService,
  ) {
    this.currentUrl = this.router.url;
  }

 

  outSideClose() {
    this.isShow = false;
  }


  // // Gère le clic sur un onglet
  // onTabClick(tabName: string): void {
  //   if (tabName === 'create group') {
  //     console.log('it works')
  //     this.openGroupPopup(); // Appeler la méthode pour ouvrir le popup
  //   }
  // }

 
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

/////////////////////////////////////

// Gère le clic sur un onglet
onTabClick(tabName: string): void {
  this.selectedTab = tabName; // Mettre à jour l'onglet actif
  if (tabName === 'create group') {
    console.log('it works');
    this.openGroupPopup(); // Ouvrir le popup de création de groupe
    return;
  }

  this.selectedTab = tabName; // Mettre à jour l'onglet actif

  // Récupérer l'utilisateur si ce n'est pas déjà fait
  this.authService.getCurrentUser().subscribe({
    next: (user) => {
      this.loadGroupsByTab(tabName, user.id);
    },
    error: (error) => {
      console.error('Erreur lors de la récupération de l’utilisateur', error);
    }
  });
}

// Charge les groupes selon l'onglet sélectionné
loadGroupsByTab(tab: string, memberId: string): void {
  if (tab === 'your groups') {
    this.loadGroupsByOwner(memberId);
  } else if (tab === 'followed groups') {
    this.loadGroups(memberId);
  }
}


////////////////////////////
selectedTab: string = 'followed groups';
ngOnInit(): void {
  this.authService.getCurrentUser().subscribe({
    next: (user) => {
      const memberId = user.id;
      this.loadGroupsByTab(this.selectedTab, memberId); // Charger les groupes au démarrage
    },
    error: (error) => {
      console.error('Erreur lors de la récupération de l’utilisateur', error);
    }
  });
}
// ngOnInit(): void {
//   this.authService.getCurrentUser().subscribe({
//     next: (user) => {
//       const memberId = user.id;
//       this.loadGroups(memberId);
//     },
//     error: (error) => {
//       console.error('Erreur lors de la récupération de l’utilisateur', error);
//     }
//   });
// }


loadGroups(memberId: string): void {
  this.groupService.getGroupsByMember(memberId).subscribe({
    next: (data) => {
      this.groups = data;
      console.log('getGroupsByMember Groupes récupérés:', this.groups);
    },
    error: (error) => {
      console.error('getGroupsByMember Erreur lors du chargement des groupes', error);
    }
  });
}


loadGroupsByOwner(memberId: string): void {
  this.groupService.getGroupsByOwner(memberId).subscribe({
    next: (data) => {
      this.groups = data;
      console.log('getGroupsByOwner Groupes récupérés:', this.groups);
    },
    error: (error) => {
      console.error('getGroupsByOwner Erreur lors du chargement des groupes', error);
    }
  });
}

updateGroup() {
  const id = 'idgroupe';
  const data = {
    name: 'Group Updated',
    description: 'Updated Description'
  };

  this.groupService.updateGroup(id, data).subscribe({
    next: (response) => {
      console.log('Group Updated', response);
    },
    error: (err) => {
      console.error('Error:', err);
    }
  });
}


}

























 // Gère la création d'un groupe
  // onGroupCreated(): void {
  //   this.showPopup = false; // Ferme le popup
  //   console.log('Le groupe a été créé avec succès !');
  //   // Vous pouvez également rafraîchir la liste des groupes ici si nécessaire
  //  }