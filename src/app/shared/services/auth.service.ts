import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  signin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, { email, password }).pipe(
      tap((response) => {
        localStorage.setItem('user', JSON.stringify(response));
      })
    );
  }

  signup(user: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/signup', {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      roles: user.roles // Assurez-vous que c'est une liste
    });
  }
}
