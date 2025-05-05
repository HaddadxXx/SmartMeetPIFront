import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ErrorEvent } from 'leaflet';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostHeaderComponent } from '../post-header/post-header.component';
import { FeatherIconComponent } from '../../feather-icon/feather-icon.component';
import { DetailBoxComponent } from '../detail-box/detail-box.component';
import { LikePanelComponent } from '../like-panel/like-panel.component';
import { PostReactComponent } from '../post-react/post-react.component';
import { GallerySectionComponent } from './gallery-section/gallery-section.component';
import { PostService } from '../../../../services/news-feed-layout/post.service'; 
import { CommonService } from '../../../../services/common.service';
import { post } from '../../../../interface/post';
import { profile } from '../../../../interface/post';
import { GoogleMapComponent } from './google-map/google-map.component';
import { PopoverLoaderComponent } from '../../popover-loader/popover-loader.component';
import { CreatePostComponent } from '../../create-post/create-post.component';
import { MessagesComponent } from '../../header/widgets/messages/messages.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-post-details',
templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
  imports: [GoogleMapComponent, FeatherIconComponent, DetailBoxComponent, LikePanelComponent, 
    PostReactComponent, CarouselModule, GallerySectionComponent, CommonModule , HttpClientModule , PopoverLoaderComponent ,NgbModule ,MessagesComponent,RouterModule,PostHeaderComponent ,RouterModule , FormsModule // Ajout du FormsModule ici
  ],
  standalone: true
})

export class PostDetailsComponent implements OnInit {
  connectedUserFirstName: string = '';
  connectedUserLastName: string = '';
  @Input() post!: any;
  currentUserId: string | null = null;
  @Input() postData!: profile;
  style1Data: any;
  posts: any[] = [];
  public sanitizedUrl!: SafeResourceUrl;
  isShow: boolean = false;
  postBeingEdited: any = null;
  newPostContent: string = '';
  newPostFeeling: string = '';
  selectedFiles: File[] = [];
  isEditing: boolean = false;
  SelectedColor: string = '';
  translatedText: string = '';
  
  constructor(public commonService: CommonService, public sanitizer: DomSanitizer , private postService: PostService , private http: HttpClient, private authService: AuthService){}


  
  ngOnInit(): void {
    this.authService.getUserFullName().subscribe(
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

      
    );
    this.posts = this.posts.filter((post, index, self) =>
      index === self.findIndex((p) => p.id === post.id)
    );
    // Charger les posts
    this.loadPosts();
    console.log("Posts chargés :", this.posts);
    this.getPosts();
  
    // Récupérer l'ID de l'utilisateur connecté
    this.currentUserId = localStorage.getItem('userId') || 'Non connecté';
    console.log('Utilisateur connecté ID:', this.currentUserId);
  
    // Mettre à jour l'affichage du temps toutes les 60 secondes
    setInterval(() => {
      this.updateTimeAgo();
    }, 60000);

    this.authService.getCurrentUser().subscribe({
      next: user => this.currentUserId = user._id,
      error: () => this.currentUserId = null
    });
    this.loadPosts();
  }
  

  isOwner(post: any): boolean {
    return this.currentUserId === post.userId;
  }
  
  public storyOptions = {
    loop: true,
    margin: 20,
    autoplay: false,
    autoplayTimeout: 1000,
    autoplayHoverPause: false,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 1.5,
      },
      400: {
        items: 2.5,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 8,
      },
    },
  };
  

  /*sanitizeUrl(url: string) {
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }*/
   

 
    outSideClose(post: any): void {
      post.isShow = false; // Fermer le dropdown spécifique au post
      console.log(`Dropdown fermé pour le post :`, post);
    }

  
  toggleDropdown(post: any): void {
    this.posts.forEach(p => p.isShow = false); // Fermer tous les autres dropdowns
    post.isShow = !post.isShow; // Basculer l'état du dropdown spécifique
  }

  
 // Dans PostDetailsComponent
// Dans ton composant
/*loadPosts(): void {
  console.log('Tentative de récupération des posts...');
  
  this.postService.getPostsWithUserDetails().subscribe({
    next: (data: any[]) => {
      console.log('Données récupérées :', data);
      
      // Typage des objets
      this.posts = data.map((post: { files?: { url?: string; isViolent?: boolean }[] }) => {
        if (post.files) {
          post.files = post.files.map((file: { url?: string; isViolent?: boolean }) => {
            // Typage explicite du paramètre 'file'
            if (file.url && !file.url.startsWith('http')) {
              console.warn('URL suspecte :', file.url);
              file.url = this.sanitizeUrl(file.url);
            }
            file.isViolent = file.isViolent ?? false;
            return file;
          });
        }
        return post;
      });

      console.log('Posts traités :', this.posts);
    },
    error: (err: any) => {
      console.error('Erreur :', err);
      this.showErrorAlert('Impossible de charger les posts');
    }
  });
}*/




loadPosts(): void {
  this.postService.getPostsWithUserDetails().subscribe(
    (data: any[]) => {
      console.log('Posts récupérés avec détails utilisateurs:', data);

      data.forEach(post => {
        if (post.files && post.files.length > 0) {
          post.files.forEach((file: any) => {
            if (file.url.endsWith('.pdf')) {
              // Transformer le lien pour ajouter fl_attachment
              file.url = file.url.replace('/upload/', '/upload/fl_attachment/');
            }
          });
        }
      });

      this.posts = data;
    },
    (error) => {
      console.error('Erreur lors de la récupération des posts:', error);
    }
  );
}


showErrorAlert(message: string) {
  alert(message); // Simple alerte JS
}

// Sanitization des URLs
private sanitizeUrl(url: string): string {
  // Exemple basique - à adapter selon ton cas
  if (url.startsWith('//')) return `https:${url}`;
  if (url.startsWith('/')) return `https://votre-domaine.com${url}`;
  return url;
}

// Gestion des erreurs d'image
handleImageError(file: any): void {
  console.error(`Échec du chargement de l'image : ${file.url}`);
  file.url = 'assets/image-error.png'; // Image de remplacement
}

// Vérification améliorée de la violence


// Vérification plus robuste des extensions
isImage(url: string): boolean {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname.toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].some(ext => path.endsWith(ext));
  } catch (e) {
    console.warn('URL invalide :', url);
    return false;
  }
}






submitEdits(): void {
  console.log('Contenu:', this.newPostContent);
  console.log('Émotion:', this.newPostFeeling);
}


/*loadPosts(): void {
  this.postService.getPostsWithUserDetails().subscribe(
      (data: any[]) => {
          console.log('Posts récupérés avec détails utilisateurs:', data);
          this.posts = data.map(post => ({
              ...post,
              firstName: post.firstName || 'Inconnu', // Valeur par défaut si firstName est manquant
              lastName: post.lastName || 'Inconnu'    // Valeur par défaut si lastName est manquant
          }));
      },
      (error) => {
          console.error('Erreur lors de la récupération des posts:', error);
      }
  );
}*/


trackByFn(index: number, item: any): number {
  return item.id; // Assurez-vous que chaque post a un ID unique
}

getPosts() {
  this.http.get<any[]>('http://localhost:9000/posts/withUserDetails').subscribe(data => {
    this.posts = data;
  });
}

updateTimeAgo() {
  this.posts = [...this.posts]; // Forcer Angular à détecter le changement
}


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

// Méthode pour éditer un post
// Méthode pour éditer un post
/*absoluteeditPosts(post: any): void {
  const updatedContent = prompt('Modifiez votre post :', post.content);
  if (updatedContent) {
    this.postService.editPost(post.id, post.userId, updatedContent).subscribe(
      (response: any) => {
        post.content = response.content; // Met à jour uniquement la propriété 'content'
        console.log('Post modifié avec succès');
      },
      (error) => {
        console.error('Erreur lors de la modification du post:', error);
      }
    );
  }
}*/




/*deletePost(postId: string, userId: string): void {
  this.postService.deletePost(postId, userId).subscribe(
    () => {
      this.posts = this.posts.filter(post => post.id !== postId); // Retire le post supprimé de la liste
      console.log('Post supprimé avec succès');
    },
    (error) => {
      console.error('Erreur lors de la suppression du post:', error);
    }
  );
}*/

deletePost(postId: string, userId: string): void {

  
  this.postService.deletePost(postId, userId).subscribe({
    next: (response) => {
      console.log('✅ Post supprimé avec succès', response);
      // Tu peux recharger les posts ou mettre à jour la liste ici
      this.loadPosts();
    },
    error: (error) => {
      console.error('❌ Erreur lors de la suppression du post:', error.error);
      alert(error.error); // Affiche le message de l'erreur backend
    }
  });
}

editPost(post: any): void {
  this.postBeingEdited = { ...post };
  this.newPostContent = post.content;
  this.newPostFeeling = post.feeling || '';
  this.selectedFiles = [];
  this.isEditing = true;
}

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    this.selectedFiles = Array.from(input.files);
  }
}

submitEdit(): void {
  if (!this.postBeingEdited) return;

  this.postService.editPostWithFiles(
    this.postBeingEdited.id,
    this.postBeingEdited.userId,
    this.newPostContent,
    this.newPostFeeling,
    this.selectedFiles
  ).subscribe({
    next: (res) => {
      console.log('Succès', res);
      this.loadPosts();
      this.cancelEdit();
    },
    error: (err) => {
      console.error('Erreur', err);
    }
  });
}

cancelEdit(): void {
  this.isEditing = false;
  this.postBeingEdited = null;
  this.newPostContent = '';
  this.newPostFeeling = '';
  this.selectedFiles = [];
}


onContentChange(event: Event): void {
  this.newPostContent = (event.target as HTMLTextAreaElement).value;
}

onFeelingChange(event: Event): void {
  this.newPostFeeling = (event.target as HTMLSelectElement).value;
}



translate(postId: string): void {
  this.postService.translatePost(postId).subscribe({
    next: (result: string) => {
      const post = this.posts.find(p => p.id === postId);
      if (post) {
        post.translatedContent = result;  // Associe la traduction au post spécifique
      }
    },
    error: (err: any) => {
      console.error('Erreur lors de la traduction', err);
    }
  });
}


 
}