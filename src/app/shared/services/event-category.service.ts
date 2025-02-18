import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { eventCategory } from '../interface/event';

@Injectable({
  providedIn: 'root'
})
export class EventCategoryService {

  constructor(public http: HttpClient) { }

  eventCategory(): Observable<eventCategory> {
    return this.http.get<eventCategory>('assets/data/event-category.json');
  }
  
}
