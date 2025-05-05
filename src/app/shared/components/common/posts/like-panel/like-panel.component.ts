import { Component } from '@angular/core';
import { PostService } from '../../../../services/news-feed-layout/post.service';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../../../services/common.service';

import { FeatherIconComponent } from '../../feather-icon/feather-icon.component';
import { Input } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Observable, Subscription, interval } from 'rxjs';
import { profile } from '../../../../interface/post';

import { emoji } from '../../../../data/common';

@Component({
  selector: 'app-like-panel',
  templateUrl: './like-panel.component.html',
 styleUrls: ['./like-panel.component.scss'],
  imports: [FeatherIconComponent ],
  standalone:true
})

export class LikePanelComponent {
  @Input() data: profile; // Données du post

  @Input() postId!: string;
  public emoji = emoji;
  public isActive: boolean = false;
  public isBookmark: boolean = false;
  emojiCount: number = 0;
  private refreshInterval: Subscription; 


  constructor( public commonServices: CommonService,
    private postService: PostService,
    private http: HttpClient,
    private authService: AuthService
){}

ngOnInit() {
  console.log('Données reçues dans data:', this.data);

  if (!this.postId && this.data?.id) {
    this.postId = this.data.id.toString();
    console.log('postId récupéré depuis data:', this.postId);
  }

  if (!this.postId) {
    console.error('❌ Erreur: postId manquant');
    return;
  }

  console.log('✅ postId reçu:', this.postId);

//   // Charger immédiatement
//   this.getCommentCount();

//   // Rafraîchir toutes les 5 secondes
//   this.refreshInterval = interval(50000).subscribe(() => {
//     this.getCommentCount();
//   });
// }


// getCommentCount() {
//   this.postService.getCommentCount(this.postId).subscribe({
//     next: (count: number) => {
//       this.commentCount = count;
//       console.log('✅ Nombre de comment:', count);
//     },
//     error: (error) => {
//       console.error('❌ Erreur lors de la récupération du nombre de commenr:', error);
//     }
//   });
// }

// ngOnDestroy() {
//   // Nettoyer l'intervalle pour éviter les fuites de mémoire
//   if (this.refreshInterval) {
//     this.refreshInterval.unsubscribe();
//   }
// }

  // commentCount: number = 0;  // Nouvelle variable pour stocker le nombre de commentaires


}





}
