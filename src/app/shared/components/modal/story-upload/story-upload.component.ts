import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from '../../../services/news-feed-layout/post.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './story-upload.component.html',
  styleUrls: ['./story-upload.component.scss']
})
export class StoryUploadComponent {
  activeModal = inject(NgbActiveModal);
  postService = inject(PostService);
  authService = inject(AuthService);

  selectedFile: File | null = null;
  status = 'Active Now';
  cssClass = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  addStory(): void {
    const userId = this.authService.getUserId();
    if (!this.selectedFile || !userId) {
      alert('Veuillez sélectionner un fichier et être connecté.');
      return;
    }
  
    this.postService.addStory(this.selectedFile, userId, this.status, this.cssClass).subscribe({
      next: (res) => {
        this.activeModal.close(res); // Ferme la modal ET envoie le résultat
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de l\'upload');
      }
    });
  }
  

 
}
