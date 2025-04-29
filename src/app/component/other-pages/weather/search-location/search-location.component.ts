import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';
import { ClickOutSideDirective } from '../../../../shared/directives/click-out-side.directive';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../../../shared/services/weather.service';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  imports: [FeatherIconComponent, ClickOutSideDirective, FormsModule, CommonModule],
  standalone: true,
  styleUrl: './search-location.component.scss'
})
export class SearchLocationComponent {
  @Output() citySelected = new EventEmitter<string>();
  @Output() preferencesChanged = new EventEmitter<{ unit: string; forecastDays: number }>();
  @ViewChild('searchInput') searchInput!: ElementRef;
  public isShow: boolean = false;
  public city: string = '';
  public unit: string = 'metric';
  public forecastDays: number = 5;
  public error: string | null = null;

  constructor(private weatherService: WeatherService) {}

  search() {
    if (!this.city.trim()) {
      this.error = 'Please enter a city name.';
      return;
    }

    this.error = null;
    // Validate city by making an API call
    this.weatherService.getWeather(this.city, this.unit).subscribe({
      next: () => {
        this.citySelected.emit(this.city);
        this.emitPreferences();
      },
      error: () => {
        this.error = 'Invalid city name. Please try again.';
      }
    });
  }

  resetForm() {
    this.city = '';
    this.unit = 'metric';
    this.forecastDays = 5;
    this.error = null;
    this.emitPreferences();
  }

  focusSearchInput() {
    this.searchInput.nativeElement.focus();
    this.isShow = false;
  }

  outSideClose() {
    this.isShow = false;
  }

  emitPreferences() {
    this.preferencesChanged.emit({
      unit: this.unit,
      forecastDays: this.forecastDays
    });
  }
}