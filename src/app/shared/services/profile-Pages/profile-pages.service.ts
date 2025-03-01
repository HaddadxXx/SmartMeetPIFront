import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { post } from '../../interface/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilePagesService {

  private apiUrl = 'http://localhost:8081/api/users/get/me';
  constructor(private http: HttpClient) { }

  timeLine(): Observable<post> {
    return this.http.get<post>('assets/data/profile-Pages/time-line.json')
  }

  activityFeed(): Observable<post> {
    return this.http.get<post>('assets/data/profile-Pages/activity-feed.json')
  }

  friendProfile(): Observable<post> {
    return this.http.get<post>('assets/data/profile-Pages/friend-profile.json')
  }

  // Méthode pour récupérer les informations de l'utilisateur connecté
  getAuthenticatedUser(): Observable<any> {

    return this.http.get<any>(this.apiUrl);
  }
}
