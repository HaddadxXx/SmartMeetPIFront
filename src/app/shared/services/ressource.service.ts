// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class RessourceService {

//   private baseUrl = 'http://localhost:8080/api/ressources';
//   private sessionUrl = 'http://localhost:8080/api/sessions';


//   constructor(private http: HttpClient) {}

//   getAllRessources(): Observable<any> {
//     return this.http.get(`${this.baseUrl}/all`);
//   }

//   createRessource(data: any): Observable<any> {
//     return this.http.post(`${this.baseUrl}/create`, data);
//   }

//   updateRessource(id: string, data: any): Observable<any> {
//     return this.http.put(`${this.baseUrl}/update/${id}`, data);
//   }

//   deleteRessource(id: string): Observable<any> {
//     return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
//   }
  
  
//   // Récupérer la liste des événements
//   getAllSessions(): Observable<any> {
//     return this.http.get(`${this.sessionUrl}/all`);
//   }
//   // Affecter un transport à un événement
//   affecterRessource(sessionId: string, ressourceId: string): Observable<string> {
//     return this.http.put(`${this.sessionUrl}/affecter-ressource/${sessionId}/${ressourceId}`, {}, { responseType: 'text' });
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RessourceService {
  private baseUrl = 'http://localhost:8080/api/ressources';
  private sessionUrl = 'http://localhost:8080/api/sessions';

  constructor(private http: HttpClient) {}

  getAllRessources(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  createRessource(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  updateRessource(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, data);
  }

  deleteRessource(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }

  getAllSessions(): Observable<any> {
    return this.http.get(`${this.sessionUrl}/all`);
  }

  affecterRessource(sessionId: string, ressourceId: string): Observable<string> {
    return this.http.put(`${this.sessionUrl}/affecter-ressource/${sessionId}/${ressourceId}`, {}, { responseType: 'text' });
  }

  // Fetch assignments (sessions) for a resource
  getAssignments(ressourceId: string): Observable<any> {
    return this.http.get(`${this.sessionUrl}/by-ressource/${ressourceId}`);
  }

  // Check availability of a resource for a given date
  checkAvailability(ressourceId: string, date: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check-availability/${ressourceId}/${date}`);
  }
}