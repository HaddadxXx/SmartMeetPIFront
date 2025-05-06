import { Component } from '@angular/core';
import { FeatherIconComponent } from '../feather-icon/feather-icon.component';
import { ClickOutSideDirective } from '../../../directives/click-out-side.directive';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-box',
  templateUrl: './profile-box.component.html',
  styleUrl: './profile-box.component.scss',
  imports: [FeatherIconComponent,ClickOutSideDirective,RouterModule,CommonModule],
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

  getProfileImage(profilePicture: string | null): string {
    return profilePicture 
      ? `url('http://localhost:8080/uploads/${profilePicture}')` 
      : `url('http://localhost:8080/uploads/defaultuser.jpg')`;
  }
  


}
