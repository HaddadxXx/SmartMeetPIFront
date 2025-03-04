import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutSideDirective } from '../../../directives/click-out-side.directive';
import { PostService } from '../../../services/news-feed-layout/post.service';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Post {
  id: number;
  userName: string;
  content: string;
  color: string;
  likes: number;
  loves: number;
  hahas: number;
  wows: number;
  commentList: Comment[];
  showComments?: boolean;
  showMenu?: boolean;
  hidden?: boolean;
}

interface Comment {
  id: number;
  userName: string;
  text: string;
  showMenu?: boolean;
  isEditing?: boolean;
  newText?: string;
}

enum ReactionType {
  LIKE,
  LOVE,
  HAHA,
  WOW
}

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, ClickOutSideDirective, FormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  @Input() isCreatePost: boolean = false;

  public selectedColor: string = 'gr-1';
  public newPostContent: string = '';
  public commentText: string = '';

  // Edit post properties
  public editPostModalVisible: boolean = false;
  public editPostContent: string = '';
  public editPostColor: string = 'gr-1';
  public selectedPost: Post | null = null; // Store the post being edited

  public colors = [
    { class: 'gr-1' }, { class: 'gr-2' }, { class: 'gr-3' },
    { class: 'gr-4' }, { class: 'gr-5' }, { class: 'gr-6' },
    { class: 'gr-7' }, { class: 'gr-8' }, { class: 'gr-9' },
    { class: 'gr-10' }, { class: 'gr-11' }, { class: 'gr-12' },
    { class: 'gr-13' }, { class: 'gr-14' }, { class: 'gr-15' }
  ];

  posts: Post[] = [];
  comments: Comment[] = [];
  ReactionType = ReactionType;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {
    this.loadPosts();
  }

    // Charger toutes les publications
  // Charger les commentaires pour chaque post
// Charger les commentaires pour chaque post
loadPosts() {
  this.postService.getAllPosts().subscribe(
    (data) => {
      this.posts = data.map(post => ({ ...post, showComments: false, showMenu: false, hidden: false }));
      this.posts.forEach(post => {
        this.postService.getAllComments(post.id).subscribe(
          (comments) => {
            post.commentList = comments;
          },
          (error: unknown) => this.handleError(error)
        );
      });
    },
    (error: unknown) => this.handleError(error)
  );
}

  // Change Color Post
  changeColor(color: string) {
    this.selectedColor = color;
  }

  // Add Post
  addPost() {
    if (this.newPostContent.trim() === '') return;

    const newPost = {
      userName: 'Utilisateur',
      content: this.newPostContent,
      color: this.selectedColor,
      likes: 0,
      loves: 0,
      hahas: 0,
      wows: 0,
      commentList: [],
      showComments: false,
      showMenu: false,
      hidden: false
    };

    this.postService.addPost(newPost).subscribe(
      (post) => {
        this.posts.unshift(post);
        this.newPostContent = '';
        this.isCreatePost = false;
      },
      (error: unknown) => this.handleError(error)
    );
  }

  // Add Comment
  addComment(post: any) {
    const commentText = this.commentText.trim();
    if (commentText !== '') {
      const commentData = {
        userName: 'Utilisateur',
        text: commentText
      };

      this.postService.addComment(post.id, commentData).subscribe(
        (data) => {
          // Recharger les commentaires après l'ajout
          this.postService.getAllComments(post.id).subscribe(
            (comments) => {
              post.commentList = comments;
              this.commentText = ''; // Réinitialiser l'input
              post.showComments = true; // Afficher les commentaires après ajout
            },
            (error: unknown) => this.handleError(error)
          );
        },
        (error: unknown) => this.handleError(error)
      );
    }
  }
    // React to Posts
  reactToPost(post: any, reaction: ReactionType) {
    switch (reaction) {
      case ReactionType.LIKE:
        post.likes = (post.likes || 0) + 1; // Ensure likes is initialized to 0 if undefined
        break;
      case ReactionType.LOVE:
        post.loves = (post.loves || 0) + 1;
        break;
      case ReactionType.HAHA:
        post.hahas = (post.hahas || 0) + 1;
        break;
      case ReactionType.WOW:
        post.wows = (post.wows || 0) + 1;
        break;
      default:
        console.error('Réaction inconnue');
    }
  }

  toggleComments(post: any) {
    post.showComments = !post.showComments;
  }

  toggleMenu(post: Post) {
    this.posts.forEach(p => {
      if (p !== post) {
        p.showMenu = false;
      }
    });
    post.showMenu = !post.showMenu;
  }

  editProfile() {
    this.router.navigate(['/profile/timeline']);
  }

  hidePost(post: Post) {
    post.hidden = true;
  }

  handleError(error: unknown) {
    console.error('Erreur', error);
    // Display an error message to the user
  }

  // Edit post functions
  openEditModal(post: Post) {
    this.selectedPost = post;
    this.editPostContent = post.content;
    this.editPostColor = post.color;
    this.editPostModalVisible = true;
  }

  closeEditModal() {
    this.editPostModalVisible = false;
    this.selectedPost = null;
  }

  changeEditColor(color: string) {
    this.editPostColor = color;
  }

  updatePost() {
    if (!this.selectedPost) return;

    const updatedPost = {
      ...this.selectedPost,
      content: this.editPostContent,
      color: this.editPostColor
    };

    this.postService.updatePost(this.selectedPost.id, updatedPost).subscribe(
      () => {
        // Update the post in the array
        const index = this.posts.findIndex(p => p.id === this.selectedPost!.id);
        if (index !== -1) {
          this.posts[index] = updatedPost;
        }
        this.closeEditModal();
      },
      (error: unknown) => this.handleError(error)
    );
  }

  // Delete post function
  deletePost(post: Post) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      this.postService.deletePost(post.id).subscribe(
        () => {
          this.posts = this.posts.filter(p => p.id !== post.id);
        },
        (error: unknown) => this.handleError(error)
      );
    }
  }
  

  // Comment functions
  toggleCommentMenu(comment: Comment) {
    // Fermer les autres menus
    this.posts.forEach(post => {
      post.commentList?.forEach(c => {
        if (c !== comment) {
          c.showMenu = false;
        }
      });
    });
    comment.showMenu = !comment.showMenu;
  }

  editComment(comment: Comment) {
    comment.isEditing = true;
    comment.newText = comment.text; // Initialiser le champ d'édition avec le texte actuel
    comment.showMenu = false; // Fermer le menu
  }

  cancelEditComment(post: Post, comment: Comment) {
    comment.isEditing = false;
    comment.newText = '';
  }


  deleteComment(post: Post, comment: Comment) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      this.postService.deleteComment(comment.id).subscribe(
        () => {
          this.postService.getAllComments(post.id).subscribe(
            (comments) => {
              post.commentList = comments;
              comment.showMenu = false;
            },
            (error: unknown) => this.handleError(error)
          );
        },
        (error: unknown) => this.handleError(error)
      );
    }
  }
  
  saveEditComment(post: Post, comment: Comment) {
    if (comment.newText && comment.newText.trim() !== '') {
      const commentData = {
        userName: comment.userName,
        text: comment.newText
      };
  
      this.postService.updateComment(comment.id, commentData).subscribe(
        () => {
          this.postService.getAllComments(post.id).subscribe(
            (comments) => {
              post.commentList = comments;
              comment.isEditing = false;
              comment.showMenu = false;
              comment.newText = '';
            },
            (error: unknown) => this.handleError(error)
          );
        },
        (error: unknown) => this.handleError(error)
      );
    } else {
      // Gérer le cas où le nouveau texte est vide
      alert('Le commentaire ne peut pas être vide.');
    }
  }
  
  
 
}

  



