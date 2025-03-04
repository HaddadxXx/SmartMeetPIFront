import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Post {
  id: number;
  userName: string;
  date: string;
  content: string;
  color: string;
  likes: number;
  loves: number;
  hahas: number;
  wows: number;
  commentList: Comment[];
}

interface Comment {
  id: number;
  userName: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postBaseUrl = 'http://localhost:8085/posts';
  private commentBaseUrl = 'http://localhost:8085/comments'; // Use /posts

  constructor(private http: HttpClient) { }

  style1(): Observable<any> {
    return this.http.get<any>('assets/data/news-feed-Layout/style1.json')
  }

  style2(): Observable<any> {
    return this.http.get<any>('assets/data/news-feed-Layout/style2.json');
  }

  style3(): Observable<any> {
    return this.http.get<any>('assets/data/news-feed-Layout/style3.json');
  }

  style4(): Observable<any> {
    return this.http.get<any>('assets/data/news-feed-Layout/style4.json');
  }

  style5(): Observable<any> {
    return this.http.get<any>('assets/data/news-feed-Layout/style5.json');
  }

  style6(): Observable<any> {
    return this.http.get<any>('assets/data/news-feed-Layout/style6.json');
  }

  style7(): Observable<any> {
    return this.http.get<any>('assets/data/news-feed-Layout/style7.json');
  }

  style8(): Observable<any> {
    return this.http.get<any>('assets/data/news-feed-Layout/style8.json');
  }

  style9(): Observable<any> {
    return this.http.get<any>('assets/data/news-feed-Layout/style9.json');
  }

  style10(): Observable<any> {
    return this.http.get<any>('assets/data/news-feed-Layout/style10.json');
  }

  style11(): Observable<any> {
    return this.http.get<any>('assets/data/news-feed-Layout/style11.json');
  }

  style12(): Observable<any> {
    return this.http.get<any>('assets/data/news-feed-Layout/style12.json');
  }

  getAllPosts(): Observable<Post[]> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Post[]>(`${this.postBaseUrl}/all`, { headers: headers });
  }

  addPost(postData: any): Observable<Post> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Post>(`${this.postBaseUrl}/add`, postData, { headers: headers });
  }

  getAllComments(postId: number): Observable<Comment[]> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Comment[]>(`${this.postBaseUrl}/${postId}/comments`, { headers: headers });
  }

  addComment(postId: string, commentData: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.postBaseUrl}/${postId}/comment`, commentData, { headers: headers });
  }


  likePost(postId: number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.postBaseUrl}/${postId}/like`, {}, { headers: headers });
  }

  lovePost(postId: number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.postBaseUrl}/${postId}/love`, {}, { headers: headers });
  }

  hahaPost(postId: number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.postBaseUrl}/${postId}/haha`, {}, { headers: headers });
  }

  wowPost(postId: number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.postBaseUrl}/${postId}/wow`, {}, { headers: headers });
  }

  // Add these methods to your PostService
  updatePost(postId: number, postData: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.postBaseUrl}/update/${postId}`, postData, { headers: headers });
  }

  deletePost(postId: number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.postBaseUrl}/delete/${postId}`, { headers: headers });
  }
  // Nouvelles méthodes pour les commentaires
  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.commentBaseUrl}/delete/${commentId}`, this.getRequestOptions());
  }
  
  updateComment(commentId: number, commentData: any): Observable<any> {
    return this.http.put(`${this.commentBaseUrl}/update/${commentId}`, commentData, this.getRequestOptions());
  }
  private getRequestOptions(): any {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return { headers: headers };
  }
  
}