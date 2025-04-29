import { Component, OnInit } from '@angular/core';
import { FeatherIconComponent } from '../../../shared/components/common/feather-icon/feather-icon.component';
import { WeatherSectionComponent } from './weather-section/weather-section.component';
import { SearchLocationComponent } from './search-location/search-location.component';
import { WeathersSkeletonComponent } from '../../../shared/skeleton-loader/others-pages-skeleton/weathers-skeleton/weathers-skeleton.component';
import { ClickOutSideDirective } from '../../../shared/directives/click-out-side.directive';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../../shared/services/weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    FeatherIconComponent,
    SearchLocationComponent,
    WeatherSectionComponent,
    WeathersSkeletonComponent,
    ClickOutSideDirective,
    CommonModule
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit {
  public isShow: boolean = false;
  public isOpen: boolean = false;
  public weatherData: any;
  public hourlyForecast: any[] = [];
  public dailyForecast: any[] = [];
  public loading: boolean = false;
  public loadingHourly: boolean = false;
  public loadingDaily: boolean = false;
  public error: string | null = null;
  public errorHourly: string | null = null;
  public errorDaily: string | null = null;
  public city: string = 'London';
  public unit: string = 'metric';
  public forecastDays: number = 5;
  public currentDate: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.updateDate();
    this.fetchWeather();
  }

  fetchWeather() {
    this.loading = true;
    this.loadingHourly = true;
    this.loadingDaily = true;
    this.error = null;
    this.errorHourly = null;
    this.errorDaily = null;

    // Fetch current weather
    this.weatherService.getWeather(this.city, this.unit).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
        this.fetchForecasts();
      },
      error: (err) => {
        this.error = 'Failed to load weather data. Please try again.';
        this.loading = false;
        this.loadingHourly = false;
        this.loadingDaily = false;
      }
    });
  }

  fetchForecasts() {
    this.weatherService.getForecast(this.city, this.unit).subscribe({
      next: (data) => {
        // Extract hourly forecast (next 6 time slots, ~18 hours)
        this.hourlyForecast = data.list.slice(0, 6);

        // Aggregate daily forecast
        this.dailyForecast = this.aggregateDailyForecast(data.list);
        this.loadingHourly = false;
        this.loadingDaily = false;
      },
      error: (err) => {
        this.errorHourly = 'Failed to load hourly forecast.';
        this.errorDaily = 'Failed to load daily forecast.';
        this.loadingHourly = false;
        this.loadingDaily = false;
      }
    });
  }

  aggregateDailyForecast(list: any[]): any[] {
    const dailyData: { [key: string]: any } = {};

    // Group by date
    list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'numeric',
        day: 'numeric'
      });
      if (!dailyData[date]) {
        dailyData[date] = {
          dt: item.dt,
          temp: { max: item.main.temp_max, min: item.main.temp_min },
          weather: [item.weather[0]],
          humidity: item.main.humidity,
          pop: item.pop || 0,
          count: 1
        };
      } else {
        dailyData[date].temp.max = Math.max(dailyData[date].temp.max, item.main.temp_max);
        dailyData[date].temp.min = Math.min(dailyData[date].temp.min, item.main.temp_min);
        dailyData[date].humidity = (dailyData[date].humidity * dailyData[date].count + item.main.humidity) / (dailyData[date].count + 1);
        dailyData[date].pop = Math.max(dailyData[date].pop, item.pop || 0);
        dailyData[date].count += 1;
        // Use the weather condition from the midday slot (closest to 12:00)
        const hour = new Date(item.dt * 1000).getHours();
        if (Math.abs(hour - 12) < Math.abs(new Date(dailyData[date].dt * 1000).getHours() - 12)) {
          dailyData[date].dt = item.dt;
          dailyData[date].weather = [item.weather[0]];
        }
      }
    });

    // Convert to array and limit to forecastDays
    return Object.values(dailyData).slice(0, this.forecastDays);
  }

  refreshWeather() {
    this.fetchWeather();
  }

  openCityChange() {
    const newCity = prompt('Enter city name:', this.city);
    if (newCity && newCity.trim()) {
      this.city = newCity.trim();
      this.fetchWeather();
    }
    this.isShow = false;
    this.isOpen = false;
  }

  onCityChange(newCity: string) {
    this.city = newCity;
    this.fetchWeather();
  }

  onPreferencesChange(preferences: { unit: string; forecastDays: number }) {
    this.unit = preferences.unit;
    this.forecastDays = Math.min(preferences.forecastDays, 5); // Limit to 5 days for free tier
    this.fetchWeather();
  }

  outSideClose() {
    this.isShow = false;
  }

  close() {
    this.isOpen = false;
  }

  updateDate() {
    const now = new Date();
    this.currentDate = now.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
}