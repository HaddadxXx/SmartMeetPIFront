// import { Component, Input } from '@angular/core';
// import { pageListing, pageListingImg } from '../../../../shared/data/favorite-page/favorite-page';
// import { CommonModule } from '@angular/common';
// import { images } from '../../../../shared/interface/common';

// @Component({
//   selector: 'app-list-box',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './list-box.component.html',
//   styleUrl: './list-box.component.scss'
// })

// export class ListBoxComponent {

//   @Input() data :pageListingImg;

// }



import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../../../shared/services/group.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { pageListing, pageListingImg } from '../../../../shared/data/favorite-page/favorite-page';
import { GroupPopupComponent } from '../group-popup/group-popup.component';
@Component({
  selector: 'app-list-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-box.component.html',
  styleUrl: './list-box.component.scss'
})
export class ListBoxComponent implements OnInit {
  
  groups: any[] = [];

  constructor(private authService: AuthService, private groupService: GroupService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        const memberId = user.id;
        this.loadGroups(memberId);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l’utilisateur', error);
      }
    });
  }

  loadGroups(memberId: string): void {
    this.groupService.getGroupsByMember(memberId).subscribe({
      next: (data) => {
        this.groups = data;
        console.log('Groupes récupérés:', this.groups);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des groupes', error);
      }
    });
  }
getGroupImage(photo: string): string {
  
  return photo ? `url('http://localhost:8080/uploads/${photo}')` : `url('assets/images/default-group.png')`;
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



  @Input() data :pageListingImg;
}
