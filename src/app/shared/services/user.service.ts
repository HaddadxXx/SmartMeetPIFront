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
  expertiseArea?: string;
  interests?: string;
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

  /**
   * Met à jour le profil utilisateur.
   * @param user Les données utilisateur à mettre à jour.
   * @param file (Optionnel) Le fichier image à uploader.
   */
  updateUserProfile(user: User, file?: File): Observable<User> {
    console.log("hello")
    const formData = new FormData();
    // Ajoute la partie JSON sous forme de Blob
    formData.append('user', new Blob([JSON.stringify(user)], { type: 'application/json' }));
    // Ajoute le fichier si fourni
    if (file) {
      formData.append('file', file);
    }
   // Log the contents of FormData
   console.log('FormData contents:');
   // Explicitly log known keys
   console.log('user:', formData.get('user'));
   if (formData.get('file')) {
       console.log('file:', formData.get('file'));
   }
    return this.http.put<User>('http://localhost:8080/api/users/me', formData);
  }
}
