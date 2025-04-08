import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileComponent } from '../../model/edit-profile/edit-profile.component';
import { AuthService } from '../../../../../shared/services/auth.service';
@Component({
  selector: 'app-profile-content',
  standalone: true,
  imports: [],
  templateUrl: './profile-content.component.html',
  styleUrl: './profile-content.component.scss'
})

export class ProfileContentComponent {

  constructor(public modalServices: NgbModal,private authService: AuthService) {}

  editProfile() {
    this.modalServices.open(EditProfileComponent, { size: 'lg' })

  }

  ngOnInit() {
    this.getCurrentUser();
  }
  public currentUser: any;
  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      console.log("voila",user)
    }, error => {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
    });
  }

}
