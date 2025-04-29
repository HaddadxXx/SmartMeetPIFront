import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';
import { ClickOutSideDirective } from '../../../../shared/directives/click-out-side.directive';
import { WeatherService } from '../../../../shared/services/weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-section',
  templateUrl: './weather-section.component.html',
  imports: [FeatherIconComponent, ClickOutSideDirective, CommonModule],
  standalone: true,
  styleUrl: './weather-section.component.scss'
})
export class WeatherSectionComponent implements OnInit {
  @Input() city: string = 'Denmark';
  @Input() unit: string = 'metric';
  @Output() cityChange = new EventEmitter<string>();
  public isOpen: boolean = false;
  public weatherData: any;
  public loading: boolean = false;
  public error: string | null = null;
  public currentTime: string = '';
  public currentDate: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.fetchWeather();
    this.updateTime();
    setInterval(() => this.updateTime(), 60000); // Update time every minute
  }

  fetchWeather() {
    this.loading = true;
    this.error = null;
    this.weatherService.getWeather(this.city, this.unit).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load weather data. Please try again.';
        this.loading = false;
      }
    });
  }

  refreshWeather() {
    this.fetchWeather();
  }

  openCityChange() {
    const newCity = prompt('Enter city name:', this.city);
    if (newCity && newCity.trim()) {
      this.city = newCity.trim();
      this.cityChange.emit(this.city);
      this.fetchWeather();
    }
    this.isOpen = false;
  }

  outSideClose() {
    this.isOpen = false;
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.currentDate = now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}