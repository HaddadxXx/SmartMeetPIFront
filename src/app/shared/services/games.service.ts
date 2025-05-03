import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { allGamesList, popularYourFriends, topGames } from '../interface/games';

@Injectable({
  providedIn: 'root'
})

export class GamesService {

  constructor(private http: HttpClient) { }

  popularYourFriends(): Observable<popularYourFriends> {
    return this.http.get<popularYourFriends>('assets/data/popular-your-friends.json');
  }

  topFiveGames(): Observable<topGames> {
    return this.http.get<topGames>('assets/data/top-five-games.json');
  }

  allGames(): Observable<allGamesList> {
    return this.http.get<allGamesList>('assets/data/all-games.json')
  }


}
