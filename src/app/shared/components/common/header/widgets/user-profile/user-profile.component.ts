import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FeatherIconComponent } from '../../../feather-icon/feather-icon.component';
import { ClickOutSideDirective } from '../../../../../directives/click-out-side.directive';
import { AuthService } from '../../../../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FeatherIconComponent, RouterModule,ClickOutSideDirective,CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent {

  public isOpen: boolean = false;

  constructor(public router: Router,private authService: AuthService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  outSideClose() {
    this.isOpen = false;
  }
  public currentUser: any;
  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    }, error => {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
    });
  }



  logOut() {
    localStorage.clear();
    this.router.navigateByUrl("/auth/login");
  }
  getProfileImage(profilePicture: string | null): string {
    return profilePicture 
      ? `url('http://localhost:8080/uploads/${profilePicture}')` 
      : `url('http://localhost:8080/uploads/defaultuser.jpg')`;
  }
}
