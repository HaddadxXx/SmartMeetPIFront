import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { chatsUser } from '../../shared/data/others-pages/messenger';
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
  updateProfile(user: any, file?: File): Observable<any> {
    const formData = new FormData();
  
    // Crée un blob JSON pour le champ "user"
    const userBlob = new Blob([JSON.stringify(user)], { type: 'application/json' });
    formData.append('user', userBlob); // C’est CRUCIAL que ça s’appelle "user"
  
    if (file) {
      formData.append('file', file);
    }
  
    return this.http.put('http://localhost:8080/api/users/me', formData, {
      withCredentials: true
    });
  }
  

  private apiUrl = 'http://localhost:8080/api/users';
  getUserInfo(id: string): Observable<chatsUser> {
    return this.http.get<chatsUser>(`${this.apiUrl}/${id}`);
  }

  // Récupérer la liste des utilisateurs
  getUsers(): Observable<chatsUser[]> {
    return this.http.get<chatsUser[]>(this.apiUrl);
  }
  
}













// private apiUrl = 'http://localhost:8080/api/users';
// // Récupérer la liste des utilisateurs et transformer en chatsUser
// getUsers(): Observable<chatsUser[]> {
//  return this.http.get<BackendUser[]>(this.apiUrl).pipe(
//    map((users: BackendUser[]) => users.map(user => this.mapToChatsUser(user)))
//  );
// }

// // Récupérer un utilisateur par ID et transformer en chatsUser
// getUserById(userId: string): Observable<chatsUser> {
//  return this.http.get<BackendUser>(`${this.apiUrl}/${userId}`).pipe(
//    map((user: BackendUser) => this.mapToChatsUser(user))
//  );
// }

// // Fonction pour transformer BackendUser en chatsUser
// private mapToChatsUser(user: BackendUser): chatsUser {
//  return {
//    id: parseInt(user.id, 16) % 1000000, // Convertit l’ID string en number (simplification, à ajuster selon tes besoins)
//    image: user.profilePicture ? `/assets/images/users/${user.profilePicture}` : 'assets/images/user/default.jpg', // Ajuste le chemin selon ton serveur
//    user: `${user.firstName} ${user.lastName}`, // Combine firstName et lastName
//    time: '2.40 PM', // Placeholder, à dynamiser avec une logique de dernier message ou lastActive
//    status: 'offline', // Placeholder, à dynamiser avec une logique online/offline
//    message: user.receivedMessages.length > 0 ? user.receivedMessages[user.receivedMessages.length - 1].content : 'No messages yet', // Dernier message reçu, à ajuster
//    count: user.receivedMessages.filter(msg => !msg.isRead).length // Compte les messages non lus, à ajuster selon ton modèle de message
//  };
// }
