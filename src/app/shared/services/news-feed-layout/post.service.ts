import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { post } from '../../interface/post';
import { AuthService } from '../auth.service';
import { throwError } from 'rxjs';
import {  HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs';
import { of } from 'rxjs';
import {  timeout, tap } from 'rxjs/operators';
import { Story } from '../../interface/post';
@Injectable({
  providedIn: 'root'
})

export class PostService {

  private apiUrl = 'http://localhost:9000/posts/add'; // Remplace avec ton URL d'API
  private apiUrlall = 'http://localhost:9000/posts/all'
 /* private apiUrlId = 'http://localhost:9000/posts/createPost/{{userId}}';*/

  constructor(private http: HttpClient ,private authService: AuthService) { }

  style1(): Observable<post> {
    return this.http.get<post>('assets/data/news-feed-Layout/style1.json')
  }
  style2(): Observable<post> {
    return this.http.get<post>('assets/data/news-feed-Layout/style2.json');
  }
  style3(): Observable<post> {
    return this.http.get<post>('assets/data/news-feed-Layout/style3.json');
  }
  style4(): Observable<post> {
    return this.http.get<post>('assets/data/news-feed-Layout/style4.json');
  }
  style5(): Observable<post> {
    return this.http.get<post>('assets/data/news-feed-Layout/style5.json');
  }
  style6(): Observable<post> {
    return this.http.get<post>('assets/data/news-feed-Layout/style6.json');
  }
  style7(): Observable<post> {
    return this.http.get<post>('assets/data/news-feed-Layout/style7.json');
  }
  style8(): Observable<post> {
    return this.http.get<post>('assets/data/news-feed-Layout/style8.json');
  }
  style9(): Observable<post> {
    return this.http.get<post>('assets/data/news-feed-Layout/style9.json');
  }
  style10(): Observable<post> {
    return this.http.get<post>('assets/data/news-feed-Layout/style10.json');
  }
  style11(): Observable<post> {
    return this.http.get<post>('assets/data/news-feed-Layout/style11.json');
  }
  style12(): Observable<post> {
    return this.http.get<post>('assets/data/news-feed-Layout/style12.json');
  }

  
  /*addPost(content: string): Observable<post> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    // Envoyer un objet Post conforme au backend
    const postData = { content: content };
    
    return this.http.post<post>(`${this.apiUrl}`, postData, { headers });
  }*/

    addPost(content: string): Observable<any> {
      const token = localStorage.getItem('jwtToken'); // Récupérer le token depuis localStorage
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Ajouter le token dans l'en-tête
        'Content-Type': 'application/json' // Spécifier le type de contenu
      });
    
      const postData = { content }; // Construire les données à envoyer
    
      return this.http.post(`${this.apiUrl}`, postData, { headers });
    }
    
    /*getPostsWithUserDetails(): Observable<any[]> {
      return this.http.get<any[]>('http://localhost:9000/posts/withUserDetails');
    }*/

      getPostsWithUserDetails(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:9000/posts/withUserDetails').pipe(
          catchError(err => {
            console.error('Erreur HTTP :', err);
            // Retourne un tableau vide avec un log
            return of([]).pipe(
              tap(() => console.log('Retour array vide après erreur'))
            );
          }),
          timeout(5000) // Timeout après 5 secondes
        );
      }
      

    /*getPostsWithUserDetailss(): Observable<any[]> {
      return this.http.get<any[]>('http://localhost:9000/posts/withUserDetails') // remplace cette URL par l'URL de ton API
        .pipe(
          catchError(error => {
            console.error('Erreur lors de la récupération des posts:', error);
            return throwError(error); // On renvoie l'erreur
          })
        );
    }*/
    
    

    /*addPostForUser(userId: string, post: { content: string }): Observable<any> {
      const url = `http://localhost:8088/posts/createPost/${userId}`;
      return this.http.post(url, post); // Envoi d'un objet JSON
    }*/

      addPostForUser(userId: string, formData: FormData): Observable<any> {
        const url = `http://localhost:9000/posts/createPosts/${userId}`;
        return this.http.post(url, formData);
      }
   
      /*addPostForUser(userId: string, formData: FormData, token: string) {
        return this.http.post<post>(
          `http://localhost:8088/posts/createPost/${userId}`, 
          formData, 
          {
            headers: new HttpHeaders({
              'Authorization': `Bearer ${token}`
            })
          }
        );
      }*/
      
    
    private apiUrlaa = 'http://localhost:9000/posts';


   // Méthode pour éditer un post
   editPost(postId: string, userId: string, updatedContent: string): Observable<any> {
    return this.http.put(`${this.apiUrlaa}/edit/${postId}/${userId}`, { content: updatedContent });
  }

  // Méthode pour supprimer un post
  deletePost(postId: string, userId: string): Observable<any> {
    return this.http.delete(`http://localhost:9000/posts/delete/${postId}/${userId}`, {
      responseType: 'text', // très important pour bien recevoir les messages backend
    });
  }
  private baseUrl = 'http://localhost:9000/comments/createComment/';

  sendComment(postId: string, userId: string, text: string) {
    const url = `http://localhost:9000/comments/createComment/${postId}/${userId}`;
    // Le texte est passé en paramètre (query param)
    return this.http.post(url, null, { params: { text } });
  }

  
  

  private baseUrl1 = 'http://localhost:9000/comments';

  getCommentsByPost(postId: string): Observable<any[]> {
    const url = `${this.baseUrl1}/byPost/${postId}`;
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('Token not found in localStorage');
      return throwError(() => new Error('Unauthorized: No token provided'));
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.get<any[]>(url, { headers });
  }

  editPostWithFiles(
    postId: string,
    userId: string,
    content: string,
    feeling: string,
    files: File[]
  ): Observable<any> {
    const formData = new FormData();
    formData.append('content', content);
    
    if (feeling) {
      formData.append('feeling', feeling);
    }
    
    files.forEach(file => {
      formData.append('files', file);
    });
  
    return this.http.put(
      `http://localhost:9000/posts/editPost/${postId}/${userId}`,
      formData
    );
  }
  

  private apiUrltt = 'http://localhost:9000/posts/translatePost';

  
  translatePost(postId: string): Observable<string> {
    return this.http.post(`${this.apiUrltt}/${postId}`, null, { responseType: 'text' });
  }

  
  private apiUrlComment = 'http://localhost:9000/comments';
private apiUrlReplay = 'http://localhost:9000/replay'; // attention à la casse et pluriel

translateComment(commentId: string): Observable<string> {
  return this.http.post(`${this.apiUrlComment}/translateComment/${commentId}`, null, { responseType: 'text' });
}

translateReplay(replayId: string): Observable<string> {
  return this.http.post(`${this.apiUrlReplay}/translateReplay/${replayId}`, null, { responseType: 'text' });
}
    
  addReplay(userId: string, commentId: string, text: string): Observable<any> {
    const url = `http://localhost:9000/replay/add/${userId}/${commentId}`;
    return this.http.post(url, {}, { params: { text } }); // {} au lieu de null
  }
    
  getReplaysByCommentId(commentId: string): Observable<any[]> {
    const url = `http://localhost:9000/replay/filter`;
    return this.http.get<any[]>(url, { params: { commentId } });
  }
private baseUrlgenere = 'http://localhost:9000/comments';

 

genererCommentaires(postId: string): Observable<string[]> {
  return this.http.get<string[]>(`${this.baseUrlgenere}/generate/${postId}`);
}
saveComment(postId: string, userId: string, text: string) {
  const params = new HttpParams().set('text', text);
  return this.http.post(`http://localhost:9000/comments/createComment/${postId}/${userId}`, {}, { params });
}

private apiUrlreaction = 'http://localhost:9000/api/reactions'; // URL de base de ton backend


addEmoj(postId: string, userId: string, reactionType: string): Observable<any> {
  //Crée les paramètres de requête
  const params = new HttpParams()
    .set('userId', userId)
    .set('postId', postId)
    .set('reactionType', reactionType);

  // Envoie une requête POST avec les paramètres
  return this.http.post(`${this.apiUrlreaction}/react`, null, { params });
}

private apiUrlnbr = 'http://localhost:9000/api/reactions'; // Remplace par ton URL backend
// Nouvelle méthode pour récupérer le nombre de réactions
getReactionCount(postId: string) {
  return this.http.get<number>(`${this.apiUrlnbr}/count`, {
    params: new HttpParams().set('postId', postId)
  });
}

getCommentCount(postId: string) {
  return this.http.get<number>(`http://localhost:9000/comments/countComment`,{ params: new HttpParams().set('postId', postId)
  });
}


addReReplay(userId: string, replayId: string, text: string) {
  const params = new HttpParams().set('text', text);
  return this.http.post(
    `http://localhost:9000/re-replay/add/${userId}/${replayId}`,
    null,
    { params }
  );
}
getReRepliesByReplyId(replayId: string): Observable<any[]> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const url = `http://localhost:9000/re-replay/byReplay/${replayId}`;
  return this.http.get<any[]>(url, { headers });
}







updateReReplay(reReplayId: string, newText: string) {
  return this.http.put(`http://localhost:9000/rereplay/update/${reReplayId}`, newText, {
    headers: { 'Content-Type': 'application/json' }
  });
}

deleteReReplay(reReplayId: string) {
  return this.http.delete(`http://localhost:9000/rereplay/delete/${reReplayId}`);
}
private apiUrlstory = 'http://localhost:9000/api';

 

  getAllStories(): Observable<Story[]> {
    return this.http.get<Story[]>(`${this.apiUrlstory}/stories`);
  }

  addStory(file: File, userId: string, status: string, cssClass: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);
    formData.append('status', status);
    formData.append('class', cssClass);

    return this.http.post(`${this.apiUrlstory}/stories`, formData);
  }

  getStories() {
    return this.http.get<any>('http://localhost:9000/api/stories/See');
  }

  deleteStory(id: string) {
    return this.http.delete(`/api/stories/${id}`); // adapte l’URL si besoin
  }
  
  
}


