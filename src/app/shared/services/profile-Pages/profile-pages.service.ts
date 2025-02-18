import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { post } from '../../interface/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilePagesService {

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
}
