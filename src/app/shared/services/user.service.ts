import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface représentant la structure d'un utilisateur
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
  // Ajoute d'autres propriétés si nécessaire…
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  /**
   * Recherche des utilisateurs en fonction du mot-clé.
   * @param userId L'ID de l'utilisateur actuel (pour exclure lui-même et ses amis)
   * @param keyword Le terme de recherche (par exemple, partie d'un email, prénom ou nom)
   */
  searchUsers(userId: string, keyword: string): Observable<User[]> {
    const params = new HttpParams()
      .set('userId', userId)
      .set('keyword', keyword);
    return this.http.get<User[]>('http://localhost:8080/api/users/search', { params });
  }
}  
