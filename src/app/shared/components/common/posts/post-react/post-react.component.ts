import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../../services/common.service';
import { CommonModule } from '@angular/common';
import { ShareComponent } from '../../../modal/share/share.component';
import { FeatherIconComponent } from '../../feather-icon/feather-icon.component';
import { CommentDataComponent } from './comment-data/comment-data.component';
import { PostService } from '../../../../services/news-feed-layout/post.service';
import { emojiList, comment } from '../../../../data/common';
import { profile } from '../../../../interface/post';
import { AuthService } from '../../../../services/auth.service';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { ClickOutSideDirective } from '../../../../directives/click-out-side.directive';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';

 // Assurez-vous que le PickerComponent est bien importé
  // Importer CUSTOM_ELEMENTS_SCHEMA



@Component({
  selector: 'app-post-react',
  templateUrl: './post-react.component.html',
  styleUrls: ['./post-react.component.scss'],
  imports: [
    FeatherIconComponent,
    CommentDataComponent,
    ClickOutSideDirective,
    NgbTooltip,
    PickerComponent,
    FormsModule,
    CommonModule,
   
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ajouter cette ligne
standalone: true
})
  



export class PostReactComponent implements OnInit {

  @Input() data: profile;
  @Output() reactionAdded = new EventEmitter<void>();
  public emojiList = emojiList;
  public commentList = comment;
  numberOfReactions: number = 0; 
  isEmoji = false;
  showEmojiPicker = false;

  chatText: string = '';

  postId: string = '';
  userId: string = '';

  public emojiToReactionTypeMap: { [key: string]: string } = {
    'assets/svg/emoji/040.svg': 'LIKE',
    'assets/svg/emoji/113.svg': 'LOVE',
    'assets/svg/emoji/027.svg': 'SAD',
    'assets/svg/emoji/052.svg': 'WOW',
    'assets/svg/emoji/039.svg': 'ANGRY',
    'assets/svg/emoji/042.svg': 'LAUGH'
  };

  constructor(
    public modalServices: NgbModal,
    private postService: PostService,
    private authService: AuthService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    if (this.data) {
      this.postId = this.data.id?.toString() ?? '';
      this.userId = this.data.userId?.toString() ?? '';
    }
    console.log('postId reçu:', this.postId);
    console.log('userId reçu:', this.userId);
  }

  share() {
    this.modalServices.open(ShareComponent, { centered: true });
  }

  toggle(item: profile) {
    item.active = !item.active;
  }

  close() {
    this.isEmoji = false;
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }
  

  // Ajout d'emoji via l'emoji picker
  addEmojiFromPicker(event: any) {
    if (event?.emoji?.native) {
      this.chatText += event.emoji.native; // Ajoute l'emoji au texte du commentaire
    } else {
      console.error('❌ Erreur: événement emoji invalide', event);
    }
  }

 

  // Ajout d'emoji à partir de la liste
  onReact(reactionType: string) {
    console.log('onReact appelé avec:', reactionType);
    const userId = this.authService.getUserId(); // <-- FIX : on appelle la méthode
    const postId = this.postId;
  
    if (!postId || !userId || !reactionType) {
      console.error('❌ postId, userId ou type de réaction manquant');
      return;
    }
  
    this.postService.addEmoj(postId, userId, reactionType).subscribe({
      next: () => {
        console.log('✅ Réaction envoyée');
         // On recharge depuis le backend
      },
      error: (err) => {
        console.error('❌ Erreur lors de la réaction:', err);
      }

    });
      this.showEmojiPicker = false;

  }
  
  

  
  isOffensive: boolean = false;

  sendComment() {
    const userId = this.authService.getUserId(); // Utilisation de getUserId pour récupérer l'ID de l'utilisateur connecté
  
    console.log('Envoi du commentaire');
    
    // Vérification des données avant d'envoyer le commentaire
    if (!this.postId) {
      console.error('❌ Erreur: postId est manquant.');
      return; // Sortir si postId est manquant
    }
  
    if (!userId) { // Utilisation de userId récupéré depuis authService
      console.error('❌ Erreur: userId est manquant.');
      return; // Sortir si userId est manquant
    }
  
    if (!this.chatText.trim()) {
      console.error('❌ Erreur: Le texte du commentaire est vide.');
      return; // Sortir si chatText est vide
    }
  
    // Si toutes les vérifications sont passées, envoyer le commentaire
    if (this.chatText.trim() !== '' && this.postId && userId) {
      console.log('✅ Commentaire envoyé:', this.chatText);
  
      // Appel à la méthode sendComment dans le service pour envoyer les données
      this.postService.sendComment(this.postId, userId, this.chatText)
        .subscribe(
          (response: any) => {
            console.log('✅ Commentaire ajouté avec succès:', response);
            this.chatText = ''; // Effacer le champ après l'envoi
          },
          (error: any) => {
            console.error('❌ Erreur lors de l\'envoi du commentaire:', error);
          }
        );
    } else {
      console.error('❌ Impossible d\'envoyer: postId, userId ou texte manquant.');
    }
  }
}

