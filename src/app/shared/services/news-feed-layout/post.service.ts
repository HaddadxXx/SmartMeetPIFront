import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { post } from '../../interface/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient) { }

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
}


