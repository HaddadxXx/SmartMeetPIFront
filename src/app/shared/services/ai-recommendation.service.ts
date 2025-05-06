// src/app/services/ai-recommendation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Recommendation {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    // … autres champs si besoin
  };
  score: number;
}

@Injectable({ providedIn: 'root' })
export class AiRecommendationService {
  private apiUrl = 'http://localhost:8080/api/recommendations';

  constructor(private http: HttpClient) {}

// 3. Récupère la liste des 5 IDs recommandés (stockés) pour un user
private apiRecos = 'http://localhost:8080/api/recommendations/ids';
  getRecommendationIds(userId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiRecos}/${userId}`);
  }
}
