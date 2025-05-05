import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:9000/api/auth';

  constructor(private http: HttpClient) { }

  signin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, { email, password },{ withCredentials: true }).pipe(
      tap((response) => {
        console.log(response)
        localStorage.setItem('user', JSON.stringify(response));
      })
    );
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  private apiUrlz = 'http://localhost:9000/api/auth';


  getUserFullName(): Observable<any> {
    return this.http.get(`${this.apiUrlz}/user/fullname`);
  }

  getUserId(): string | null {
    const user = this.getUser();
    console.log('Utilisateur récupéré dans getUserId():', user);
    return user ? user.id : null;
  }

  signup(user: any): Observable<any> {
    return this.http.post('http://localhost:9000/api/auth/signup', {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      roles: user.roles 
    });
  }

  
  verifySignupCode(email: string, code: string) {
    const url = `http://localhost:9000/api/auth/verify-code?email=${email}&code=${code}`;
    return this.http.get(url);
  }

  private apiUrlme = 'http://localhost:9000/api/users/me'; // Endpoint pour récupérer l'utilisateur connecté
  // Récupérer l'utilisateur connecté
  getCurrentUser(): Observable<any> {
    return this.http.get<any>(this.apiUrlme, { withCredentials: true });
  }


}
