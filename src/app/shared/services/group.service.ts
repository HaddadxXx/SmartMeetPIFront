import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Le service est disponible dans toute l'application
})
export class GroupService {
  private apiUrl = 'http://localhost:8080/api/groups'; // URL de votre backend Spring Boot

  constructor(private http: HttpClient) {}

  // Méthode pour créer un groupe
  createGroup(groupData: { name: string, description: string, visibility: string }, file: File | null): Observable<any> {
    const formData: FormData = new FormData();

    // Ajoutez les données du groupe au FormData
    formData.append('group', new Blob([JSON.stringify(groupData)], {
      type: 'application/json',
    }));

    // Ajoutez le fichier photo si présent
    if (file) {
      formData.append('file', file, file.name);
    }

    // Envoyez la requête POST au backend
    return this.http.post(`${this.apiUrl}/create`, formData);
  }
}