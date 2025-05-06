import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../../services/auth.service'; // Adjust the path based on your project structure
import { switchMap, forkJoin } from 'rxjs';
import { ClickOutSideDirective } from '../../../../../directives/click-out-side.directive';
import { FeatherIconComponent } from '../../../feather-icon/feather-icon.component';
import { RouterModule } from '@angular/router';
import { PopupRecommendationComponent } from './pop-up-recommendation/popup-recommendation.component';
@Component({
  selector: 'app-ai-recommendation',
  standalone: true,
  imports: [CommonModule, ClickOutSideDirective, FeatherIconComponent, RouterModule,PopupRecommendationComponent],
  templateUrl: './ai-recommendation.component.html',
  styleUrls: ['./ai-recommendation.component.scss']
})
export class AiRecommendationComponent {
  isPopupOpen = false;
  recommendedUsers: any[] = [];

  constructor(private authService: AuthService) { }

  openPopup() {
    this.isPopupOpen = true;
    this.loadRecommendations();
  }

  closePopup(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.isPopupOpen = false;
  }

  loadRecommendations() {
    this.authService.getCurrentUser().pipe(
      switchMap(currentUser => {
        if (!currentUser) {
          console.error('Aucun utilisateur connecté');
          return [];
        }
        return this.authService.getRecommendationIds(currentUser.id);
      }),
      switchMap(ids => {
        if (ids.length === 0) {
          return [];
        }
        const userObservables = ids.map(id => this.authService.getUserById(id));
        return forkJoin(userObservables);
      })
    ).subscribe({
      next: (users) => {
        this.recommendedUsers = users;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des recommandations', err);
        this.recommendedUsers = [];
      }
    });
  }
  getProfileImage(profilePicture: string | null): string {
    return profilePicture 
      ? `url('http://localhost:8080/uploads/${profilePicture}')` 
      : `url('http://localhost:8080/uploads/defaultuser.jpg')`;
  }


    /** Ajout de la fonction de trackBy pour *ngFor */
    trackByFn(index: number, user: any): any {
      return user.id;
    }




    isFullScreenPopupOpen = false;
    // Add these methods
  openFullScreenPopup() {
    this.isPopupOpen = false; // Close the small popup
    this.isFullScreenPopupOpen = true;
  }

  closeFullScreenPopup() {
    this.isFullScreenPopupOpen = false;
  }
}