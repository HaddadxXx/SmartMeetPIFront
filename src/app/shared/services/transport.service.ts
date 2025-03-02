/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  private baseUrl = 'http://localhost:8087/api/transports';

  constructor(private http: HttpClient) {}

  getAllTransport(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  createTransport(transport: any): Observable<string> {
    return this.http.post(`${this.baseUrl}/create`, transport, { responseType: 'text' });
  }

  updateTransport(id: string, transport: any): Observable<string> {
    return this.http.put(`${this.baseUrl}/update/${id}`, transport, { responseType: 'text' });
  }

  deleteTransport(id: string): Observable<string> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }
}
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  private baseUrl = 'http://localhost:8087/api/transports';

  constructor(private http: HttpClient) {}

  getAllTransports(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  createTransport(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  updateTransport(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, data);
  }

  deleteTransport(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }
}

