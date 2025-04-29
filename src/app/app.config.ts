import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { provideHttpClient } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { appRoutingProviders, routes } from './app.routes';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { provideCharts } from 'ng2-charts';  // ✅ Correct import




export const appConfig: ApplicationConfig = {
  providers: [
    ...appRoutingProviders, // Includes provideRouter(routes) and AdminGuard
   provideRouter(routes),
   provideHttpClient(),
   provideAnimations(),
   provideCharts(), // ✅ Add NgChartsModule here
    importProvidersFrom(
    FormsModule, // Import FormsModule
    FlatpickrModule.forRoot({}),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ZXingScannerModule
    
)
  ],
};
