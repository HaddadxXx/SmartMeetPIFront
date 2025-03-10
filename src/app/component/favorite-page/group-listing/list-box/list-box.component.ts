

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
export class ListBoxComponent  {
  


  constructor( private groupService: GroupService) {}




getGroupImage(photo: string): string {
  
  return photo ? `url('http://localhost:8080/uploads/${photo}')` : `url('http://localhost:8080/uploads/default.png')`;
}






@Input() group: any;
}
