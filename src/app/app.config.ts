import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { provideHttpClient } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { routes } from './app.routes';
import { FlatpickrModule } from 'angularx-flatpickr';
<<<<<<< HEAD
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
=======
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';
>>>>>>> NEW_Event_Session

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideHttpClient(),
  provideAnimations(),
<<<<<<< HEAD
  provideCharts(withDefaultRegisterables()),
=======
>>>>>>> NEW_Event_Session
  importProvidersFrom(
    FlatpickrModule.forRoot({}),
    CalendarModule.forRoot({
    provide: DateAdapter,
    useFactory: adapterFactory
<<<<<<< HEAD
  }))
=======
  })),
  NgbModalModule ,NgbModal , NgChartsModule 
>>>>>>> NEW_Event_Session
  ],
};
