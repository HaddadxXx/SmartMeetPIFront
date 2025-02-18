import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { photosGallery } from '../interface/single-page';

@Injectable({
  providedIn: 'root'
})
export class SinglePageService {

  constructor(private http: HttpClient) {}

  photosGallery():Observable<photosGallery> {
    return this.http.get<photosGallery>('assets/data/photos-gallery.json')
  }

}
