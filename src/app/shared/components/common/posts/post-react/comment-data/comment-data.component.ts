import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit , Output, EventEmitter} from '@angular/core'; // ✅ Ajout de Input et OnInit
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../../../services/auth.service';
import { FeatherIconComponent } from '../../../feather-icon/feather-icon.component';
import { PopoverLoaderComponent } from '../../../popover-loader/popover-loader.component';
import { PostService } from '../../../../../services/news-feed-layout/post.service';
import { CommonService } from '../../../../../services/common.service';
import { HttpClient } from '@angular/common/http';
import { profile } from '../../../../../interface/post';
import moment from 'moment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Comment } from '../../../../../interface/post';
import { ShareComponent } from '../../../../modal/share/share.component';
import { emojiList } from '../../../../../data/common';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { NgModel } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { ParamMap } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgModelGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';  
import { post } from '../../../../../interface/post'; // <-- Import FormsModule

@Component({
  
  selector: 'app-comment-data',
  templateUrl: './comment-data.component.html',
  styleUrl: './comment-data.component.scss',
  imports:[FeatherIconComponent,PopoverLoaderComponent,CommonModule,NgbModule, FormsModule],
  standalone:true
  
})

export class CommentDataComponent  {

  

  @Input() postId!: string;
  @Input() postData!: profile;
  @Input() Comment!: any;
  editingUserId: string = '';
  style1Data: any;
  editingCommentId: string | null = null;
  editingReplayId: string | null = null;
   // ID du commentaire en cours d'édition
  editedText: string = ''; // Texte modifié
  public sanitizedUrl!: SafeResourceUrl;
  connectedUserFirstName: string = '';
  connectedUserLastName: string = '';
  /*@Input() data: profile;*/
 /* connectedUserFirstName: string = ''; // Declare the property
  connectedUserLastName: string = ''; */
  public comments: any[] = [];
  currentUserId: string = '';
  activeReplyId: string | null = null;
  newReply: string = '';  // Tracks which comment's reply input is active
  data: any = {}; // Initialize data object
  public emojiList = emojiList;
  public isEmoji: boolean = false;
  public isShow: boolean = false;
  public chatText: string;
  public showEmojiPicker:boolean = false;
  replyTexts: { [key: string]: string } = {};
  reReplayTexts: { [key: string]: string } = {};
  userId: string = '';
  items: any[] = [];
  generatedComment: string = '';
  error: string = '';
  replayReplyTexts: { [key: string]: string } = {};
   posts: any [] =[];
   replies: any[] = [];
  activeReReplayId: string | null = null;

  commentaireGenere: string = '';
  commentairesProposes: string[] = [];
  isActive: boolean = false;
  @Input() generatedComments: string[] = [];
  selectedComment: string = '';
  page: number = 0;      // Numéro de la page actuelle
  size: number = 3;      // Nombre de commentaires par page
  loading: boolean = false;  // Indicateur de chargement
  hasMore: boolean = true;   // Si la pagination doit continuer
  @Output() suggestionSelected = new EventEmitter<string>(); // Événement 
  
  constructor(public commonServices :CommonService, private postService: PostService,  private authService: AuthService , private http: HttpClient ,  public sanitizer: DomSanitizer , private cdr: ChangeDetectorRef ,
    private route: ActivatedRoute ){

  }

  trackByCommentId(index: number, item: any): any {
    return item.id;  // ou l'attribut unique du commentaire
  }


  /*ngOnInit() {
    console.log('Post ID received:', this.postId); // Debugging
    this.loadComments();
  }*/
    /*ngOnInit(): void {
      this.loadComments();
    }
  
    loadComments(): void {
      const url = `http://localhost:8088/comments/byPost/${this.postId}`;
      this.http.get<any[]>(url).subscribe(
        data => {
          this.comments = data;
          console.log('Comments loaded:', data);
        },
        error => {
          console.error('Error loading comments:', error);
        }
      );
    }*/

      /*ngOnInit(): void {
        this.getUserFullName();
        this.loadComments();
      }
    
      getUserFullName(): void {
        this.authService.getUserFullName().subscribe({
          next: (userInfo: any) => {
            if (userInfo && userInfo.firstName && userInfo.lastName) {
              this.connectedUserFirstName = userInfo.firstName;
              this.connectedUserLastName = userInfo.lastName;
              console.log('User Info:', userInfo); // Check the structure and values
            } else {
              console.warn('User info is incomplete:', userInfo);
              this.connectedUserFirstName = 'Unknown';
              this.connectedUserLastName = 'User';
            }
          },
          error: (error) => console.error('Error loading user info', error)
        });
      }
    
      loadComments(): void {
        this.http.get<any[]>(`http://localhost:8088/comments/byPost/${this.postId}`).subscribe({
          next: (data) => {
            this.comments = data;
          },
          error: (error) => console.error('Error loading comments', error)
        });

      }*/
      
        // Fonction pour afficher "il y a 10 min" ou "il y a 1 jour"


getTimeAgo(postDate: string): string {
  const now = new Date();
  const postTime = new Date(postDate);
  console.log(`🔍 Calcul du temps écoulé pour : ${postDate} (converti : ${postTime})`);
  
  const diffMs = now.getTime() - postTime.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `il y a ${diffDays} jour(s)`;
  if (diffHours > 0) return `il y a ${diffHours} heure(s)`;
  if (diffMinutes > 0) return `il y a ${diffMinutes} minute(s)`;
  return "À l'instant";
}

trackByFn(index: number, item: any): number {
  return item.id; // Assurez-vous que chaque post a un ID unique
}


        updateTimeAgo() {
          this.comments = [...this.comments]; // Forcer Angular à détecter le changement
        }
        
        
        /*getComments() {
          this.http.get<any[]>(' http://localhost:9000/comments/createComment/{{postId}}/{{userId}}').subscribe(data => {
            this.comments = data;
          });
        }*/

        getComments() {
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

        /*getComment(text: string) {
          const postId = this.postId;  // ton postId courant
          const userId = this.authService.getUserId();  // ton utilisateur connecté
        
          const url = `http://localhost:9000/comments/createComment/${postId}/${userId}`;
        
          // Envoi POST avec le texte en paramètre
          this.http.post(url, null, { params: { text: text } }).subscribe({
            next: (data) => {
              console.log('Commentaire ajouté avec succès :', data);
              // Tu peux par exemple rafraîchir les commentaires ici si tu veux
                // Recharge les commentaires après ajout
            },
            error: (err) => {
              console.error('Erreur lors de l\'ajout du commentaire :', err);
            }
          });
        }*/
        

          /*getComments() {
            const postId = this.postId;  // Assure-toi que postId est correctement défini
            const userId = this.authService.getUserId();  // Assure-toi que tu récupères correctement l'ID de l'utilisateur
          
            const url = `http://localhost:9000/comments/createComment/${postId}/${userId}`;  // Construction de l'URL dynamique
          
            this.http.get<any[]>(url).subscribe({
              next: (data) => {
                this.comments = data;
                console.log('Commentaires récupérés :', this.comments);
              },
              error: (err) => {
                console.error('Erreur lors de la récupération des commentaires :', err);
              }
            });
          }*/



        toggleDropdown(comment: any) {
          comment.isShow = !comment.isShow;
        }

        toggleDropdownReplay(reply: any) {
          // Fermer les autres dropdowns si besoin
          this.items.forEach((item: any) => {
            item.replies?.forEach((r: any) => {
              if (r !== reply) {
                r.isShow = false;
              }
            });
          });
        
          // Toggle le dropdown du replay actuel
          reply.isShow = !reply.isShow;
        }

        outSideCloseReplay(replay: any) {
          replay.isShow = false;
        }
        
        startEditingReplay(reply: any) {
          this.editingReplayId = reply.id;
          this.editedText = reply.text;
        }
        
        cancelEditingReplay() {
          this.editingReplayId = null;
          this.editedText = '';
        }
        
        onInputChangeReplay(event: Event , itemId: string) {
          const target = event.target as HTMLInputElement;
          this.editedText = target.value;
          this.reReplayTexts[itemId] = target.value;
        }

        
        outSideClose(comment: any) {
          comment.isShow = false;
        }

        trackItem(index: number, item: any): string {
          return item.id; // Assure-toi que chaque commentaire a un identifiant unique
      }

        ngOnInit(): void {
        
          /*this.authService.getUserFullName().subscribe(
            (userInfo: { firstName: string; lastName: string }) => {
                if (userInfo) {
                    this.connectedUserFirstName = userInfo.firstName;
                    this.connectedUserLastName = userInfo.lastName;
                    console.log('Nom et prénom de l\'utilisateur connecté :', this.connectedUserFirstName, this.connectedUserLastName);
                }
            },
            (error: any) => {
                console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
            }


        );*/

        this.posts.forEach((post: any) => {
          post.replies?.forEach((reply: any) => {
            reply.showReReplies = false;
          });
        });

        this.route.paramMap.subscribe(params => {
          const id = params.get('id');
          if (id) {
            this.postId = id;
                  // tes commentaires existants
             // nouvel appel auto pour générer le commentaire
          }
        });

        
        
        this.getCurrentUserInfo();
        this.loadComments();
        this.getCurrentUserFromStorage();
        this.getComments();  

          // Récupérer l'ID de l'utilisateur connecté
    this.currentUserId = localStorage.getItem('userId') || 'Non connecté';
    console.log('Utilisateur connecté ID:', this.currentUserId);
  
    // Mettre à jour l'affichage du temps toutes les 60 secondes
    setInterval(() => {
      this.updateTimeAgo();
    }, 60000);  
        }


        getCurrentUserInfo(): void {
          this.authService.getUserFullName().subscribe({
            next: (userInfo: any) => {
              if (userInfo?.firstName && userInfo?.lastName) {
                this.connectedUserFirstName = userInfo.firstName;
                this.connectedUserLastName = userInfo.lastName;
                console.log('Nom utilisateur connecté :', this.connectedUserFirstName, this.connectedUserLastName);
              } else {
                console.warn('Infos utilisateur incomplètes :', userInfo);
              }
            },
            error: (err) => console.error('Erreur infos utilisateur', err)
          });
        }

        
        getCurrentUserFromStorage(): void {
          const storedUserId = localStorage.getItem('userId'); // Assuming userId is stored in local storage
          if (storedUserId) {
            this.currentUserId = storedUserId;
          } else {
            console.warn('User ID not found in local storage');
          }
        }

      
    
       
      
        /*loadComments(): void {
          const url = `http://localhost:9000/comments/byPost/${this.postId}`;
          this.http.get<any[]>(url).subscribe({
            next: (data) => {
              this.comments = data.map(comment => {
                const hasBadWords = comment.containsBadWordsFr || comment.containsBadWordsEn;
                return {
                  ...comment,
                  text: hasBadWords ? '*****' : comment.text,  // 🛡️ masquer si bad words
                  timeAgo: moment(comment.createdAt).fromNow()
                };
              });
              console.log('Commentaires chargés :', this.comments);
            },
            error: (err) => console.error('Erreur chargement des commentaires', err)
          });
        }*/

          loadComments(): void {
            if (this.loading) return;
            this.loading = true;
          
            const url = `http://localhost:9000/comments/byPost/${this.postId}`;
            this.http.get<any[]>(url).subscribe({
              next: (data) => {
                const newComments = data.map(comment => {
                  const hasBadWords = comment.containsBadWordsFr || comment.containsBadWordsEn;
                  return {
                    ...comment,
                    text: hasBadWords ? '*****' : comment.text,
                    timeAgo: moment(comment.createdAt).fromNow(),
                    emotion: comment.emotion
                  };
                });
          
                this.comments = newComments;  // on écrase directement
                this.loading = false;
          
                console.log('Commentaires chargés :', this.comments);
              },
              error: (err) => {
                console.error('Erreur chargement des commentaires', err);
                this.loading = false;
              }
            });
          }
          
          loadMoreComments(): void {
            if (this.hasMore && !this.loading) {
              this.loadComments();
            }
          }

          getEmotionColor(emotion: string): string {
            switch (emotion.toLowerCase()) {
              case 'joy': return '#28a745';       // vert
              case 'sadness': return '#6c757d';   // gris
              case 'anger': return '#dc3545';     // rouge
              case 'disgust': return '#fd7e14';   // orange
              case 'fear': return '#6610f2';      // violet
              case 'surprise': return '#17a2b8';  // cyan
              case 'neutral': return '#007bff';   // bleu
              default: return '#007bff';           // bleu par défaut
            }
          }
          
        

        isOffensive: boolean = false;

        sendComment() {
          const userId = this.authService.getUserId();
          
          if (!this.postId || !userId || !this.chatText.trim()) {
            console.error('❌ Erreur: postId, userId ou texte vide');
            return;
          }
      
          this.postService.sendComment(this.postId, userId, this.chatText.trim()).subscribe({
            next: (response: any) => {
              console.log('✅ Commentaire ajouté avec succès:', response);
              this.chatText = ''; // reset
              this.isOffensive = false; // Réinitialise si le commentaire est valide
            },
            error: (error: any) => {
              if (error.status === 400) {
                console.error('❌ Erreur: Le commentaire contient des mots offensants.');
                this.isOffensive = true;  // Marque le commentaire comme offensant
                this.chatText = ''; // efface le texte
              } else {
                console.error('❌ Erreur lors de l\'envoi du commentaire:', error);
              }
            }
          });
        }

        /*toggleReplyInput(commentId: string): void {
          this.activeReplyId = this.activeReplyId === commentId ? null : commentId;
        }*/
      
        /*addReply(commentId: string): void {
          if (!this.newReply.trim()) {
            console.warn('Reply cannot be empty');
            return;
          }
      
          const reply = {
            uname: 'Current User', // Replace with actual username from your authentication system
            comment: this.newReply.trim()
          };
      
          const url = `http://localhost:8088/comments/comments/${commentId}/replay`;
          this.http.post<any>(url, reply).subscribe({
            next: (updatedComment) => {
              console.log('Reply added successfully:', updatedComment);
              const index = this.comments.findIndex(c => c.id === commentId);
              if (index !== -1) {
                this.comments[index] = updatedComment; // Replace with updated comment
              }
              this.newReply = ''; // Clear input field
              this.activeReplyId = null; // Hide input field
            },
            error: (error) => console.error('Error adding reply:', error)
          });
        }*/


          /*toggleReplyInput(commentId: string): void {
            this.activeReplyId = this.activeReplyId === commentId ? null : commentId;
            this.newReply = ''; // Clear the input field when toggling
          }
        
          addReply(commentId: string): void {
            if (!this.newReply.trim()) {
              console.warn('Reply cannot be empty');
              return;
            }
        
            const reply = {
              uname: 'Current User', // Replace with actual username
              comment: this.newReply.trim()
            };
        
            const url = `http://localhost:8088/comments/comments/${commentId}/replay`;
            this.http.post<any>(url, reply).subscribe({
              next: (updatedComment) => {
                console.log('Reply added successfully:', updatedComment);
                const index = this.comments.findIndex(c => c.id === commentId);
                if (index !== -1) {
                  this.comments[index] = updatedComment; // Replace with updated comment
                }
                this.activeReplyId = null; // Hide the input field after posting the reply
              },
              error: (error) => console.error('Error adding reply:', error)
            });
          }
        
          onInputChange(event: Event): void {
            const inputElement = event.target as HTMLInputElement;
            this.newReply = inputElement.value; // Update newReply property with input value
          }*/
           

            toggleReplyInput(commentId: string): void {
              this.activeReplyId = this.activeReplyId === commentId ? null : commentId;
              this.newReply = ''; // Clear the input field when toggling
              const comment = this.comments.find(c => c.id === commentId);
              if (comment) {
                comment.showReplies = !comment.showReplies;
              }
            }
            
            toggleReplies(item: any) {
              item.showReplies = !item.showReplies;
              if (item.showReplies && (!item.replies || item.replies.length === 0)) {
                this.loadRepliesForComments(item.id);
              }
            }


            toggleReReplies(reply: any) {
              reply.showReReplies = !reply.showReReplies;
            }
          
            /*addReply(commentId: string): void {
              if (!this.newReply.trim()) {
                console.warn('Reply cannot be empty');
                return;
              }
          
              const reply = {
                text: this.newReply.trim() // "comment" property changed to "text"
              };
          
              const userId = this.authService.getUserId(); // Retrieve user ID from authService
          
              if (userId) {
                const url = `http://localhost:8088/comments/comments/${commentId}/replay/${userId}`;
                this.http.post<any>(url, reply).subscribe({
                  next: (createdReplay) => {
                    console.log('Replay added successfully:', createdReplay);
                    // Find the index of the updated comment in the comments array
                    const commentIndex = this.comments.findIndex(comment => comment.id === commentId);
          
                    if (commentIndex !== -1) {
                      // Assuming 'replies' is an array of replies in each comment
                      if (!this.comments[commentIndex].replies) {
                        this.comments[commentIndex].replies = [];
                      }
                      this.comments[commentIndex].replies.push(createdReplay);
          
                      // Make sure Angular detects the change by creating a new array
                      this.comments = [...this.comments];
                    }
          
                    this.activeReplyId = null; // Hide the input field after posting the reply
                    this.newReply = ''; // Clear the input field
                  },
                  error: (error) => console.error('Error adding reply:', error)
                });
              } else {
                console.error('User ID not found');
              }
            }*/


              addReply(commentId: string): void {
                const replyText = this.replyTexts[commentId];
                const userId = this.authService.getUserId();
              
                if (!userId) {
                  alert("Vous devez être connecté pour répondre.");
                  return;
                }
              
                if (replyText) {
                  this.postService.addReplay(userId, commentId, replyText).subscribe({
                    next: () => {
                      const newReply = {
                        user: { firstName: 'Vous', lastName: '' },
                        text: replyText
                      };
              
                      const comment = this.comments.find(c => c.id === commentId);
                      if (comment) {
                        // ✅ Sécurité : si replies n’existe pas encore
                        if (!comment.replies) {
                          comment.replies = [];
                        }
              
                        comment.replies.push(newReply);
                        comment.showReplies = true;
                        this.cdr.detectChanges();
                      }
              
                      this.replyTexts[commentId] = ''; // Efface l'input
                    },
                    error: (err) => {
                      console.error("Erreur lors de l'ajout de la réponse :", err);
                    }
                  });
                }
              }
              
              
              
              
          
            onInputChange(event: Event): void {
              const input = event.target as HTMLInputElement;
              this.editedText = input.value; // Mettre à jour le texte modifié
            }

           

            loadRepliesForComments(commentId: string): void {
              this.postService.getReplaysByCommentId(commentId).subscribe({
                next: (replies: any[]) => {
                  const comment = this.comments.find(c => c.id === commentId);
                  if (comment) {
                    comment.replies = replies; // Replace existing replies
                    comment.showReplies = true;
                    this.cdr.detectChanges();
                  }
                },
                error: (err) => {
                  console.error("Erreur lors de la récupération des réponses :", err);
                }
              });
            }
            

            updateReplyText(event: Event, commentId: string) {
              const target = event.target as HTMLInputElement;
              this.replyTexts[commentId] = target.value;
            }
            

            onInputChanges(event: Event, commentId: string): void {
              const input = event.target as HTMLInputElement;
              this.replyTexts[commentId] = input.value;
            }

            trackByReplyId(index: number, reply: any): string {
              return reply.id; // Angular utilise l'ID unique pour suivre les éléments
            }
            
            
            deleteComment(commentId: number): void {
              const url = `http://localhost:9000/comments/${commentId}`;
              this.http.delete(url).subscribe({
                next: () => {
                  console.log('Commentaire supprimé avec succès');
                  // Rafraîchir la liste des commentaires
                  this.loadComments(); // cette méthode doit recharger les commentaires
                },
                error: (error) => {
                  console.error('Erreur lors de la suppression du commentaire :', error);
                }
              });
            }

            
            startEditing(comment: any): void {
              const userId = comment.userId; // ✅ on utilise le champ retourné par le backend
              if (!userId) {
                console.error("Impossible d'enregistrer : userId est undefined !");
                console.log("Comment reçu dans startEditing:", comment); // facultatif pour debug
                return;
              }
            
              this.editingCommentId = comment.id;
              this.editedText = comment.text;
              this.editingUserId = userId;
            }
            
            
            
            onReplyTextChange(commentId: string, value: string): void {
              this.replyTexts[commentId] = value;
            }
            
            
            saveEdit(commentId: string, userId: string): void {
              if (!userId) {
                console.error("Impossible d'enregistrer : userId est undefined !");
                return;
              }
              this.editComment(commentId, userId, this.editedText);
            }

           
            

cancelEditing(): void {
  this.editingCommentId = null; // Réinitialiser l'état d'édition
  this.editedText = ''; // Réinitialiser le texte modifié
}

editComment(commentId: string, userId: string, updatedText: string): void {
  const url = `http://localhost:9000/comments/edit/${commentId}/${userId}`;
  const body = { text: updatedText };

  this.http.put(url, body).subscribe({
    next: () => {
      console.log('Commentaire modifié avec succès');
      this.loadComments(); // Recharger les commentaires après modification
      this.cancelEditing(); // Annuler l'édition
    },
    error: (error) => {
      console.error('Erreur lors de la modification :', error);
    }
  });
}

/*onInputChanges(event: Event, id: string) {
  const input = event.target as HTMLInputElement | null;
  if (input) {
    this.replyTexts[id] = input.value;
  }
}*/


        
            /*editComment(commentId: number, userId: number, newText: string): void {
              const url = `http://localhost:8088/comments/edit/${commentId}/${userId}`;
              const body = { text: newText };
            
              this.http.put(url, body).subscribe({
                next: () => {
                  console.log('Commentaire modifié avec succès');
                  this.loadComments(); // Recharge les commentaires après modification
                },
                error: (error) => {
                  console.error('Erreur lors de la modification du commentaire :', error);
                }
              });
            }*/
            
              
              addEmoji(event: { emoji: { native: any; }; }) {
                const text = `${event.emoji.native}`;
                this.chatText = text;
                this.showEmojiPicker = false;
              }
            
              public toggleEmojiPicker(){
                this.showEmojiPicker=!this.showEmojiPicker;
              } 
              
              
              saveEditReplay(replayId: string) {
                if (!replayId || !this.editedText) {
                  console.error("Impossible de sauvegarder : données manquantes.");
                  return;
                }
              
                this.http.put(`http://localhost:9000/replay/update/${replayId}`, this.editedText, {
                  headers: { 'Content-Type': 'application/json' }
                }).subscribe({
                  next: (res) => {
                    console.log('Replay mis à jour avec succès !');
                    this.editingReplayId = null;
                    this.loadComments(); // Recharge les commentaires si nécessaire
                  },
                  error: (err) => {
                    console.error('Erreur lors de la mise à jour du replay :', err);
                  }
                });
              
              }


              
                deleteReplay(replayId: string) {
                  if (!replayId) {
                    console.error("Replay ID manquant");
                    return;
                  }
                
                  this.http.delete(`http://localhost:9000/replay/delete/${replayId}`)
                    .subscribe({
                      next: () => {
                        console.log("Replay supprimé avec succès");
                        this.loadComments(); // recharge les données si nécessaire
                      },
                      error: (err) => {
                        console.error("Erreur lors de la suppression :", err);
                      }
                    });
                }

                /*selectComment(comment: string) {
                  this.selectedComment = comment;
                }*/
                
              
                toggleCommentSuggestions() {
                  this.isActive = !this.isActive;
                  if (this.isActive && this.generatedComments.length === 0) {
                    this.postService.genererCommentaires(this.postId)
                      .subscribe(
                        (value: string | string[]) => {
                          const raw = Array.isArray(value) ? value : [value];
                          const comments: string[] = [];
                          raw.forEach(item => {
                            try {
                              const parsed = JSON.parse(item);
                              const content: string = parsed.choices[0].message.content;
                              content
                                .split('\n')
                                .map(l => l.replace(/^-+\s*/, '').trim())
                                .filter(l => l)
                                .forEach(l => comments.push(l));
                            } catch {}
                          });
                          this.generatedComments = comments;
                        },
                        err => console.error('❌ Erreur auto commentaires :', err)
                      );
                  }
                }
              
                // 2) Sélectionne une suggestion
                selectComment(comment: string) {
                  this.selectedComment = comment;
                }
              
                // 3) Soumet le commentaire choisi
                submitComment() {
                  if (!this.selectedComment.trim()) return;
                  const user = JSON.parse(localStorage.getItem('user')!);
                  const userId = user.id;
                  this.postService.saveComment(this.postId, userId, this.selectedComment)
                    .subscribe({
                      next: res => {
                        console.log('✅ Commentaire enregistré :', res);
                        this.reset();
                      },
                      error: err => console.error('❌ Erreur enregistrement :', err)
                    });
                }
              
                private reset() {
                  this.selectedComment = '';
                  this.generatedComments = [];
                  this.isActive = false;
                }

                
                insertToExistingInput(comment: string) {
                  const inputElement = document.querySelector('#commentInput') as HTMLInputElement;
                  if (inputElement) {
                    inputElement.value = comment;
                    inputElement.dispatchEvent(new Event('input')); // important si Angular écoute les changements
                  }
                }

                // Emettre l'événement avec la suggestion sélectionnée
    selectSuggestion(suggestion: string) {
      this.suggestionSelected.emit(suggestion);
  }
  

  

  addReReplay(replayId: string): void {
    console.log('🟡 addReReplay triggered for replayId:', replayId);
  
    const text = this.replayReplyTexts[replayId]?.trim();
    const userId = this.authService.getUserId();
  
    console.log('🟠 User ID:', userId);
    console.log('🟠 Text:', text);
  
    if (!userId) {
      alert("Vous devez être connecté pour répondre à une réponse.");
      return;
    }
  
    if (!text) {
      console.warn('⛔ Aucun texte saisi pour reReplay.');
      return;
    }
  
    this.postService.addReReplay(userId, replayId, text).subscribe({

    
      next: () => {
        console.log('✅ ReReplay envoyé au backend avec succès.');
  
        const newReReplay = {
          user: { firstName: 'Vous', lastName: '' },
          text: text
        };
  
        const parentComment = this.comments.find(comment =>
          comment.replies?.some((reply: { id: string }) => reply.id === replayId)
        );
  
        console.log('🟢 parentComment trouvé:', parentComment);
  
        const reply = parentComment?.replies?.find((r: { id: string }) => r.id === replayId);
  
        console.log('🟢 reply trouvé:', reply);
  
        if (reply) {
          if (!reply.reReplies) {
            console.log('🆕 Initialisation de reply.reReplies.');
            reply.reReplies = [];
          }
          reply.reReplies = [...(reply.reReplies || []), newReReplay];

          console.log('📌 Nouvelle reReplay ajoutée localement :', newReReplay);
          this.cdr.detectChanges();
        } else {
          console.warn('⚠️ Aucun reply correspondant trouvé pour ID:', replayId);
        }
  
        this.replayReplyTexts[replayId] = '';
      },
      error: (err) => {
        console.error("❌ Erreur lors de l'ajout du reReplay :", err);
      }
    });
  }
  
  
  
  toggleReReplayInput(itemId: string): void {
    this.activeReReplayId = this.activeReReplayId === itemId ? null : itemId;

    
  }
  reply = {
    showReReplies: false,  // Valeur par défaut
    reReplies: []  // tableau vide ou rempli de réponses
    // autres propriétés
  };
toggleReReplayInputs
  (reply: any): void {
    // Basculer l'état de `showReReplies` (de true à false, ou inverse)
    reply.showReReplies = !reply.showReReplies;
  }
  
  
 
  loadReReplies(reply: any): void {
    if (!reply.reReplies) { // Charger uniquement si pas déjà chargé
      this.postService.getReRepliesByReplyId(reply.id).subscribe({
        next: (replies) => {
          console.log('✅ ReReplies reçues du backend :', replies);
          reply.reReplies = replies;
        },
        error: (err) => {
          console.error('❌ Erreur lors de la récupération des reReplies :', err);
          alert('Erreur d\'authentification, veuillez vous reconnecter.');
        }
      });
    }
  }
  

  toggleDropdownReReply(reply: any, rereply: any) {
    // Fermer les autres dropdowns de rereply
    reply.reReplies?.forEach((rr: any) => {
      if (rr !== rereply) {
        rr.isShow = false;
      }
    });
  
    // Toggle le dropdown de la rereply actuelle
    rereply.isShow = !rereply.isShow;
  }
  
  outSideCloseReReply(rereply: any) {
    rereply.isShow = false;
  }
  
  deleteReReplay(reReplayId: string) {
    if (!reReplayId) {
      console.error("ReReplay ID manquant");
      return;
    }

    this.http.delete(`http://localhost:9000/re-replay/delete/${reReplayId}`)
      .subscribe({
        next: () => {
          console.log("ReReplay supprimé avec succès");
          this.loadComments();
        },
        error: (err) => {
          console.error("Erreur lors de la suppression du reReplay :", err);
        }
      });
  }


  editingReReplayId: string | null = null;


  saveEditReReplay(reReplayId: string) {
    if (!reReplayId || !this.editedText) {
      console.error("Impossible de sauvegarder : données manquantes.");
      return;
    }
  
    this.http.put(
      `http://localhost:9000/re-replay/update/${reReplayId}?text=${encodeURIComponent(this.editedText)}`,
      null, // Pas de body
      {
        headers: { 'Content-Type': 'application/json' }
      }
    ).subscribe({
      next: (res) => {
        console.log('ReReplay mis à jour avec succès !');
        this.editingReReplayId = null;
        this.editedText = '';
        this.loadComments(); // Recharge les commentaires si besoin
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du reReplay :', err);
      }
    });
  }
  
  startEditingReReplay(reReplay: any) {
    this.editingReReplayId = reReplay.id;
    this.editedText = reReplay.text; // si `text` contient le texte initial
    reReplay.isShow = false; // fermer le menu déroulant après clic
  }

  cancelEditingReReplay() {
    this.editingReReplayId = null;
    this.editedText = '';
  }

  
  translateComment(commentId: string): void {
    this.postService.translateComment(commentId).subscribe({
      next: (translatedText) => {
        const comment = this.comments.find(c => c.id === commentId);
        if (comment) {
          comment.translatedText = translatedText;
        }
      },
      error: (err) => console.error('Erreur traduction commentaire', err)
    });
  }
  
  translateReplay(replayId: string): void {
    this.postService.translateReplay(replayId).subscribe({
      next: (translatedText) => {
        const replay = this.replies.find(r => r.id === replayId);
        if (replay) {
          replay.translatedText = translatedText;
        }
      },
      error: (err) => console.error('Erreur traduction replay', err)
    });
  }
}   
                


                
  



