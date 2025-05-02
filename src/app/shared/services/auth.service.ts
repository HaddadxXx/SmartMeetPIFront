import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { FormsModule } from '@angular/forms'; // 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8889/api/auth';
  constructor(private http: HttpClient) { }

  signin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, { email, password },{ withCredentials: true }).pipe(
      tap((response) => {
        console.log(response)
        localStorage.setItem('user', JSON.stringify(response));
      })
    );
  }

  signup(user: any): Observable<any> {
    return this.http.post('http://localhost:8889/api/auth/signup', {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      roles: user.roles 
    });
  }

  
  verifySignupCode(email: string, code: string) {
    const url = `http://localhost:8889/api/auth/verify-code?email=${email}&code=${code}`;
    return this.http.get(url);
  }

  private apiUrlme = 'http://localhost:8889/api/users/me'; // Endpoint pour récupérer l'utilisateur connecté
  // Récupérer l'utilisateur connecté
  getCurrentUser(): Observable<any> {
    return this.http.get<any>(this.apiUrlme, { withCredentials: true });
  }
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  getUserId(): string | null {
    const user = this.getUser();
    console.log('Utilisateur récupéré dans getUserId():', user);
    return user ? user.id : null;
  }

}
