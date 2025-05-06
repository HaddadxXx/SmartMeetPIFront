import { Component, OnInit } from '@angular/core';
import { FeatherIconComponent } from '../../../feather-icon/feather-icon.component';
import { ClickOutSideDirective } from '../../../../../directives/click-out-side.directive';
import { FriendRequestService } from '../../../../../services/friendrequest.service';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-friend-request',
  standalone: true,
  imports: [FeatherIconComponent, ClickOutSideDirective],
  templateUrl: './friend-request.component.html',
  styleUrl: './friend-request.component.scss'
})
export class FriendRequestComponent implements OnInit {
  public isOpen: boolean = false;
  public friendRequests: any[] = [];
  public currentUserId: string | null = null;

  constructor(
    private friendRequestService: FriendRequestService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Récupérer l'utilisateur connecté
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUserId = user.id; // Assurez-vous que l'API renvoie un champ "id"
      this.loadPendingRequests();
    });
  }

  loadPendingRequests(): void {
    if (this.currentUserId) {
      this.friendRequestService.getPendingRequests(this.currentUserId).subscribe(requests => {
        this.friendRequests = requests.map(request => {
          // Récupérer les détails de l'expéditeur pour chaque demande
          this.authService.getUserById(request.senderId).subscribe(sender => {
            request.senderDetails = sender; // Ajouter les détails de l'expéditeur
            console.log("hedha",sender)
          });
          return request;
        });
      });
    }
  }

  confirmRequest(requestId: string): void {
    this.friendRequestService.respondToRequest(requestId, 'ACCEPTED').subscribe(() => {
      this.loadPendingRequests(); // Recharger les requêtes après confirmation
    });
  }

  deleteRequest(requestId: string): void {
    this.friendRequestService.respondToRequest(requestId, 'REJECTED').subscribe(() => {
      this.loadPendingRequests(); // Recharger les requêtes après suppression
    });
  }

  outSideClose(): void {
    this.isOpen = false;
  }

  getProfileImage(profilePicture: string | null): string {
    return profilePicture 
      ? `url('http://localhost:8080/uploads/${profilePicture}')` 
      : `url('http://localhost:8080/uploads/defaultuser.jpg')`;
  }

}