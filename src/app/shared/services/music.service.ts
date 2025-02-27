import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { playlist, popularSongs, song, yourFavoriteArtist } from '../interface/music';

@Injectable({
  providedIn: 'root'
})

export class MusicService {

  constructor(private http: HttpClient) {}

 yourFavoriteArtist(): Observable<yourFavoriteArtist> {
    return this.http.get<yourFavoriteArtist>('assets/data/your-favorite-artist.json');
  }

 favoritePlaylist():Observable<playlist> {
     return this.http.get<playlist>('assets/data/favorite-playlist.json')
  }

 popularSongs():Observable<popularSongs>{
     return this.http.get<popularSongs>('assets/data/popular-songs.json')
  }

 songList():Observable<song>{
    return this.http.get<song>('assets/data/song-list.json')

  }
}
