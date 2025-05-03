import { Component } from '@angular/core';
import { UserService, User } from '../../../../../services/user.service'; // adapte le chemin d'import
import { ClickOutSideDirective } from '../../../../../directives/click-out-side.directive';
import { FeatherIconComponent } from '../../../feather-icon/feather-icon.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [FeatherIconComponent, ClickOutSideDirective,CommonModule],
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {

  public isOpen: boolean = false;
  public searchKeyword: string = '';
  public searchResults: User[] = [];

  // Remplacer 'CURRENT_USER_ID' par l'ID de l'utilisateur connecté.
  // Dans une application réelle, cet ID proviendrait par exemple d'un service d'authentification.
  private currentUserId: string = '67b48a3af233692bf6f47a5d';

  constructor(private userService: UserService) {}

  outSideClose() {
    this.isOpen = false;
  }

  // Méthode appelée à chaque changement dans l'input
  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchKeyword = input.value;
  
    if (this.searchKeyword.length >= 2) {
      this.userService.searchUsers(this.currentUserId, this.searchKeyword)
        .subscribe({
          next: (users: User[]) => {  // typage explicite des utilisateurs
            this.searchResults = users;
            
          },
          error: (err: any) => {  // typage explicite de l'erreur
            console.error('Erreur lors de la recherche des utilisateurs', err);
           
            this.searchResults = [];
          }
        });
    } else {
      this.searchResults = [];
    }
  }
  getProfileImage(profilePicture: string | null): string {
    return profilePicture 
      ? `url('http://localhost:8080/uploads/${profilePicture}')` 
      : `url('http://localhost:8080/uploads/defaultuser.jpg')`;
  }
}
