import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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
    return this.http.post(`${this.apiUrl}/create`, formData,{
      withCredentials: true,} // 🔥 Envoi du cookie HttpOnly avec JWT
    );
  }



  // group.service.ts
  getGroupsByMember(memberId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/member/${memberId}`, { withCredentials: true });
  }


  updateGroup(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, { withCredentials: true });
  }



  getGroupsByOwner(memberId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/owner/${memberId}`, { withCredentials: true });
  }


  getGroupById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { withCredentials: true });
  }


  getAllExceptMember(memberId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all-except/${memberId}`, { withCredentials: true });
  }


}