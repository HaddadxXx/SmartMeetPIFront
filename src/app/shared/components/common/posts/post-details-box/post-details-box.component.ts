import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FeatherIconComponent } from '../../feather-icon/feather-icon.component'; // Import ajouté
import { PostService } from '../../../../services/news-feed-layout/post.service'; // Import ajouté
import { ShareComponent } from '../../../modal/share/share.component';
import { profile } from '../../../../interface/post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-post-details-box',
  standalone: true,
  imports: [
    CommonModule, 
    FeatherIconComponent // Ajouté ici
  ],
  templateUrl: './post-details-box.component.html',
  styleUrls: ['./post-details-box.component.scss'] // Correction de styleUrl -> styleUrls
})
export class PostDetailsBoxComponent {
  @Input() postData!: profile; // Ajout du ! pour la sécurité TypeScript
  @Input() postId!: string; // Ajouté pour la gestion des commentaires
  userId: string = '';

  // Nouvelles propriétés pour les commentaires
  isActive = false;
  generatedComments: string[] = [];
  selectedComment = '';
  errorMessage = '';

  constructor(
    public modalServices: NgbModal,
    private postService: PostService,private http: HttpClient ,private authService: AuthService// Injection du service
  ) { }

  // Méthodes existantes
  share() {
    this.modalServices.open(ShareComponent, {
      centered: true
    });
  }

  // Méthodes pour les commentaires
  toggleCommentSuggestions() {
    this.isActive = !this.isActive;
    if (this.isActive && this.generatedComments.length === 0) {
      this.postService.genererCommentaires(this.postId).subscribe({
        next: (value: string | string[]) => {
          const raw = Array.isArray(value) ? value : [value];
          const comments: string[] = [];
          
          raw.forEach(item => {
            try {
              const parsed = JSON.parse(item);
              const content = parsed.choices[0].message.content;
              
              content
  .split('\n')
  .map((l: string) => l.replace(/^-+\s*/, '').trim())
  .filter((l: string) => l)
  .forEach((l: string) => comments.push(l));

            } catch (e) {
              console.error('Erreur de parsing :', e);
              this.errorMessage = 'Erreur de format des commentaires';
            }
          });
          
          this.generatedComments = comments;
        },
        error: (err) => {
          console.error('Erreur :', err);
          this.errorMessage = 'Échec de la génération des commentaires';
        }
      });
    }
  }

  selectComment(comment: string) {
    this.selectedComment = comment;
  }


  submitComment() {
    if (!this.selectedComment.trim()) {
      this.errorMessage = 'Le commentaire ne peut pas être vide';
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!user?.id) {
      this.errorMessage = 'Utilisateur non authentifié';
      return;
    }

    this.postService.saveComment(this.postId, user.id, this.selectedComment).subscribe({
      next: (res) => {
        console.log('Commentaire enregistré :', res);
        this.reset();
      },
      error: (err) => {
        console.error('Erreur :', err);
        this.errorMessage = "Échec de l'enregistrement";
      }
    });
  }

  private reset() {
    this.selectedComment = '';
    this.generatedComments = [];
    this.isActive = false;
    this.errorMessage = '';
  }
}
