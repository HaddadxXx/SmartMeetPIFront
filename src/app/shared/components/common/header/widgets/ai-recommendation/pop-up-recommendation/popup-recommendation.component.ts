// 
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../services/auth.service';

@Component({
  selector: 'app-popup-recommendation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-recommendation.component.html',
  styleUrls: ['./popup-recommendation.component.scss']
})
export class PopupRecommendationComponent implements OnInit {
  @Input() recommendedUsers: any[] = [];
  @Output() close = new EventEmitter<void>();

  requestSent: { [key: string]: boolean } = {};
  mutualRequests: { [key: string]: boolean } = {};

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loadMutualRequests();
  }

  trackByFn(index: number, user: any): any {
    return user.id;
  }

  getProfileImage(profilePicture: string | null): string {
    return profilePicture 
      ? `url('http://localhost:8080/uploads/${profilePicture}')` 
      : `url('http://localhost:8080/uploads/defaultuser.jpg')`;
  }

  closePopup() {
    this.close.emit();
  }

  joinMeet(): void {
    this.router.navigate(['/call']);
  }

  loadMutualRequests() {
    this.authService.getCurrentUser().subscribe(currentUser => {
      if (currentUser) {
        this.recommendedUsers.forEach(user => {
          this.authService.checkMutualRequests(currentUser.id, user.id).subscribe(isMutual => {
            this.mutualRequests[user.id] = isMutual;
          });
        });
      }
    });
  }

  sendCallRequest(toUserId: string) {
    this.authService.getCurrentUser().subscribe(currentUser => {
      if (currentUser) {
        this.authService.sendCallRequest(currentUser.id, toUserId).subscribe({
          next: () => {
            this.requestSent[toUserId] = true;
            this.loadMutualRequests();
          },
          error: (err) => console.error('Error sending request', err)
        });
      }
    });
  }
}