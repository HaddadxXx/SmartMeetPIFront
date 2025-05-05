import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { FeatherIconComponent } from '../../feather-icon/feather-icon.component';
import { PopoverLoaderComponent } from '../../popover-loader/popover-loader.component';
import { CommonService } from '../../../../services/common.service';
import { PostService } from '../../../../services/news-feed-layout/post.service';
import { AuthService } from '../../../../services/auth.service';
import { profile } from '../../../../interface/post';

@Component({
  selector: 'app-detail-box',
  templateUrl: './detail-box.component.html',
  styleUrls: ['./detail-box.component.scss'],
  imports: [FeatherIconComponent, CommonModule, NgbModule, PopoverLoaderComponent],
  standalone: true
})
export class DetailBoxComponent implements OnInit, OnDestroy, OnChanges {
  @Input() data: profile;
  postId: string = '';
  public isActive: boolean = false;
  public isBookmark: boolean = false;
  emojiCount: number = 0;
  commentCount: number = 0;
  private refreshInterval: Subscription;

  constructor(
    public commonServices: CommonService,
    private postService: PostService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.data) {
      this.postId = this.data.id?.toString() ?? '';
      this.getReactionCount();
      this.getCommentCount();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) {
      this.postId = this.data.id?.toString() ?? '';
      this.getReactionCount();
      this.getCommentCount();
    }
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }

  getReactionCount() {
    if (!this.postId) return;
    this.postService.getReactionCount(this.postId).subscribe({
      next: (count: number) => {
        this.emojiCount = count;
        console.log('✅ Nombre de réactions:', count);
      },
      error: (error) => {
        console.error('❌ Erreur lors de la récupération du nombre de réactions:', error);
      }
    });
  }

  getCommentCount() {
    if (!this.postId) return;
    this.postService.getCommentCount(this.postId).subscribe({
      next: (count: number) => {
        this.commentCount = count;
        console.log('✅ Nombre de commentaires:', count);
      },
      error: (error) => {
        console.error('❌ Erreur lors de la récupération du nombre de commentaires:', error);
      }
    });
  }

  onReact(reactionType: string) {
    const userId = this.authService.getUserId(); // <-- FIX : on appelle la méthode
    const postId = this.postId;
  
    if (!postId || !userId || !reactionType) {
      console.error('❌ postId, userId ou type de réaction manquant');
      return;
    }
  
    this.postService.addEmoj(postId, userId, reactionType).subscribe({
      next: () => {
        console.log('✅ Réaction envoyée');
        this.getReactionCount(); // On recharge depuis le backend
      },
      error: (err) => {
        console.error('❌ Erreur lors de la réaction:', err);
      }
    });
  }
  
}
