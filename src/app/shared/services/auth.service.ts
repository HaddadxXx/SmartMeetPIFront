import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { FormsModule } from '@angular/forms'; // ✅ Importation de FormsModule


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) { }

  signin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, { email, password }).pipe(
      tap((response) => {
        localStorage.setItem('user', JSON.stringify(response));
      })
    );
  }

  signup(user: any): Observable<any> {
    return this.http.post('http://localhost:8081/api/auth/signup', {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      roles: user.roles 
    });
  }
  verifySignupCode(email: string, code: string) {
    const url = `http://localhost:8081/api/auth/verify-code?email=${email}&code=${code}`;
    return this.http.get(url);
  }
}
