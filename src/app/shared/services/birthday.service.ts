import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { birthday } from '../interface/birthday';

@Injectable({
  providedIn: 'root'
})

export class BirthdayService {
 
  constructor(private http: HttpClient) {}

  birthday(): Observable<birthday> {
    return this.http.get<birthday>('assets/data/birthday.json');
  }

}
