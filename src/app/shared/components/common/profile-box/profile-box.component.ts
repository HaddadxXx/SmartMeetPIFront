import { Component } from '@angular/core';
import { FeatherIconComponent } from '../feather-icon/feather-icon.component';
import { ClickOutSideDirective } from '../../../directives/click-out-side.directive';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
<<<<<<< HEAD
import { CommonModule } from '@angular/common';
=======
>>>>>>> NEW_Event_Session
@Component({
  selector: 'app-profile-box',
  templateUrl: './profile-box.component.html',
  styleUrl: './profile-box.component.scss',
<<<<<<< HEAD
  imports: [FeatherIconComponent,ClickOutSideDirective,RouterModule,CommonModule],
=======
  imports: [FeatherIconComponent,ClickOutSideDirective,RouterModule],
>>>>>>> NEW_Event_Session
  standalone:true
})

export class ProfileBoxComponent {
  
  public isShow: boolean = false;
 constructor(private authService: AuthService) {}
  outSideClose(){
      this.isShow = false;
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
<<<<<<< HEAD
 
  getProfileImage(profilePicture: string | null): string {
    return profilePicture 
      ? `url('http://localhost:8084/uploads/${profilePicture}')` 
      : `url('http://localhost:8084/uploads/defaultuser.jpg')`;
  }
=======
  
>>>>>>> NEW_Event_Session


}
