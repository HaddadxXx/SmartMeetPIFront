import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { post } from '../interface/post';

@Injectable({
  providedIn: 'root'
})
export class FavoritePagesService {

  constructor(private http: HttpClient) { }

  post(): Observable<post> {
    return this.http.get<post>('assets/data/default-post.json')
  }

}
