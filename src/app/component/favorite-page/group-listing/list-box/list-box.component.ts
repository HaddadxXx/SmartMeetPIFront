

import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../../../shared/services/group.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { pageListing, pageListingImg } from '../../../../shared/data/favorite-page/favorite-page';
import { GroupPopupComponent } from '../group-popup/group-popup.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-list-box',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './list-box.component.html',
  styleUrl: './list-box.component.scss'
})
export class ListBoxComponent  {
  
  currentUser: any;

  constructor( private groupService: GroupService,private authService: AuthService,) {}


  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      console.log('USERRRRR',user)
    }, error => {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
    });
  }

getGroupImage(photo: string): string {
  
  return photo ? `url('http://localhost:8088/uploads/${photo}')` : `url('http://localhost:8088/uploads/default.png')`;
}


@Output() groupSelected = new EventEmitter<number>(); // Émet l'ID du groupe

  onCardClick() {
    this.groupSelected.emit(this.group.id);
  }



@Input() group: any;
}
