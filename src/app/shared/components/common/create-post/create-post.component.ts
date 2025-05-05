import { Component, Input } from '@angular/core';
import { FeatherIconComponent } from '../feather-icon/feather-icon.component';
import { CommonModule } from '@angular/common';
import { ClickOutSideDirective } from '../../../directives/click-out-side.directive';
import { CreateOptionComponent } from './create-option/create-option.component';
import { PostService } from '../../../services/news-feed-layout/post.service';  // Import du service pour gérer les posts
import { post } from '../../../interface/post';  // Assurez-vous que l'interface post est bien importée
import { FormsModule } from '@angular/forms'; // Importez FormsModule
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { profile } from '../../../interface/post';
import { DetailBoxComponent } from '../../common/posts/detail-box/detail-box.component';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FeatherIconComponent, CreateOptionComponent, CommonModule, ClickOutSideDirective,FormsModule ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})

export class CreatePostComponent {
  

  @Input() isCreatePost: boolean;

  public newPostContent: string = '';  // Contenu du post
 
  public posts: post[] = [];  // Liste des posts, utiliser l'interface post
  public SelectedColor: string;
  public isColor: boolean = false;
  public class: string;
  public isPost: boolean = true;


  
 
  @Input() content!: string; // <-- Ajoutez cette ligne
  currentPostIndex: number = 0; // Index du post actuellement affiché
  public color = [
    {
      class: 'gr-1'
    },
    {
      class: 'gr-2'
    },
    {
      class: 'gr-3'
    },
    {
      class: 'gr-4'
    },
    {
      class: 'gr-5'
    },
    {
      class: 'gr-6'
    },
    {
      class: 'gr-7'
    },
    {
      class: 'gr-8'
    },
    {
      class: 'gr-9'
    },
    {
      class: 'gr-10'
    },
    {
      class: 'gr-11'
    },
    {
      class: 'gr-12'
    },
    {
      class: 'gr-13'
    },
    {
      class: 'gr-14'
    },
    {
      class: 'gr-15'
    },
  ]

  constructor(private postService: PostService , private authService: AuthService) {}  // Injection du service pour gérer les posts



  ngOnInit() {
    console.log('Initialisation de newPostContent : ', this.newPostContent);
}


  change(value: string) {
    this.class = value;
  }

  /*updatePostContent() {
    console.log('Contenu mis à jour : ', this.newPostContent);
}*/


  changeColor(item: string) {
    this.SelectedColor = item;
    this.isColor = true;
  }
    
    


  getPost(value: boolean) {
    this.isPost =  value;
  }

  onInputChange(event: Event): void {
    console.log('Contenu mis à jour : ', this.newPostContent);
  }
  

 
  
    // Méthode pour afficher le post suivant
    nextPost(): void {
      if (this.currentPostIndex < this.posts.length - 1) {
        this.currentPostIndex++;
      }
    }
  
    // Méthode pour afficher le post précédent
    previousPost(): void {
      if (this.currentPostIndex > 0) {
        this.currentPostIndex--;
      }
    }


    private handleError(error: any): Observable<never> {
      console.error('Une erreur est survenue:', error);
      return throwError(() => new Error(error.message || 'Erreur serveur'));
    }


    
    

        updatePostContent(content: string) {
          this.newPostContent = content;
          console.log('Contenu mis à jour : ', this.newPostContent); // Debug
        }


        /*addPost() {
          if (!this.newPostContent?.trim()) {
            console.warn('Le contenu du post est vide.');
            return;
          }
        
          this.postService.addPost(this.newPostContent).subscribe({
            next: (post) => {
              console.log('Post ajouté avec succès : ', post);
              this.posts.unshift(post); // Ajoute le post en tête de liste
              this.newPostContent = ''; // Réinitialise l'input après ajout
            },
            error: (err) => {
              console.error('Erreur lors de l\'ajout du post : ', err);
            }
          });
        }*/

        /*addPostForUser() {
          const userId = this.authService.getUserId();
        
          // 🔴 Vérification avant d'envoyer les données
          if (!this.newPostContent || this.newPostContent.trim() === "") {
            console.error("❌ Contenu vide ou non défini !");
            return;
          }
        
          const post = { content: this.newPostContent };
        
          console.log("📤 Envoi du post :", post); // Debug
        
          if (userId) {
            this.postService.addPostForUser(userId, post).subscribe(
              (response) => {
                console.log("✅ Post ajouté avec succès", response);
              },
              (error) => {
                console.error("❌ Erreur lors de l'ajout du post", error);
              }
            );
          } else {
            console.error("❌ Utilisateur non connecté");
          }
        }*/

          selectedFiles: File[] = [];

onFileSelected(event: any) {
  this.selectedFiles = Array.from(event.target.files);
  console.log("📂 Fichiers sélectionnés :", this.selectedFiles);
}

addPostForUser() {
  const userId = this.authService.getUserId();

  if (!this.newPostContent || this.newPostContent.trim() === "") {
    console.error("❌ Contenu vide !");
    return;
  }

  const formData = new FormData();
  formData.append("content", this.newPostContent);

  // Ajoute les fichiers sélectionnés (si présents)
  this.selectedFiles.forEach(file => {
    formData.append("files", file); // même nom que @RequestPart("files")
  });

  // (optionnel) si tu veux envoyer une humeur
  // formData.append("feeling", "HAPPY");

  if (userId) {
    this.postService.addPostForUser(userId, formData).subscribe(
      (response) => {
        console.log("✅ Post créé :", response);
      },
      (error) => {
        console.error("❌ Erreur lors de l'envoi :", error);
      }
    );
  } else {
    console.error("❌ Utilisateur non connecté !");
  }
}
        
        
}
