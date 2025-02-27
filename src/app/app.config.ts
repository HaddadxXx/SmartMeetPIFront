import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { provideHttpClient } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { routes } from './app.routes';
import { FlatpickrModule } from 'angularx-flatpickr';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideHttpClient(),
  provideAnimations(),
  importProvidersFrom(
    FlatpickrModule.forRoot({}),
    CalendarModule.forRoot({
    provide: DateAdapter,
    useFactory: adapterFactory
  }))
  ],
};
