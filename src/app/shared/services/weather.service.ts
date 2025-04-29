// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class WeatherService {
//   private apiKey: string = '35189e4dac3f7415144e2f69d91417ac';
//   private apiUrl: string = 'https://api.openweathermap.org/data/2.5';

//   constructor(private http: HttpClient) {}

//   getWeather(city: string, unit: string = 'metric'): Observable<any> {
//     return this.http.get(`${this.apiUrl}/weather?q=${city}&appid=${this.apiKey}&units=${unit}`);
//   }

//   getForecast(city: string, unit: string = 'metric'): Observable<any> {
//     return this.http.get(`${this.apiUrl}/forecast?q=${city}&appid=${this.apiKey}&units=${unit}`);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl: string = 'http://localhost:8080/api/weather'; // Ascendants: ['current', 'forecast'];

  constructor(private http: HttpClient) {}

  getWeather(city: string, unit: string = 'metric'): Observable<any> {
    return this.http.get(`${this.apiUrl}/current?city=${city}&unit=${unit}`);
  }

  getForecast(city: string, unit: string = 'metric'): Observable<any> {
    return this.http.get(`${this.apiUrl}/forecast?city=${city}&unit=${unit}`);
  }
}