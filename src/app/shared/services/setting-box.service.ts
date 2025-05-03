import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { settingBox } from '../interface/setting-box';

@Injectable({
  providedIn: 'root'
})
export class SettingBoxService {

  constructor(private http: HttpClient) {}

  storyBox(): Observable<settingBox> {
    return this.http.get<settingBox>('assets/data/setting-box-list.json');
  }
}
