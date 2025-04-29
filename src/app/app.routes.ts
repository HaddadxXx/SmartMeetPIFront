import { provideRouter, Routes } from '@angular/router';
import { AdminGuard } from './shared/auth-guard/auth.guard';
import { ContentComponent } from './shared/components/layout/content/content.component';
import { FullComponent } from './shared/components/layout/full/full.component';
import { fullRoutes } from './shared/routes/full-routes';
import { contentRoutes } from './shared/routes/routes';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { DashboardComponent } from './backEnd/dashboard/dashboard.component';
import { UsersComponent } from './backEnd/users/users.component';
import { ReportsComponent } from './backEnd/reports/reports.component';
import { SettingsComponent } from './backEnd/settings/settings.component';
import { LoginComponent } from './backEnd/login/login.component';
import { NgModule } from '@angular/core';
import { SignupComponent } from '../app/auth/auth-login/signup.component';
import { VerifComponent } from '../app/auth/auth-login/verif.component';
import { PageHomeComponent } from './component/favorite-page/page-home/page-home.component';
import { LoadingComponent } from './shared/skeleton-loader/widgets/loading/loading.component';
import { QrScannerComponent } from './component/other-pages/event/qr-scanner/qr-scanner.component';
import { ConfirmationComponent } from './component/other-pages/event/confirmation/confirmation.component';
import { EventRegistrationComponent } from './component/other-pages/event/event-registration/event-registration.component';

export const routes: Routes = [
  { path: 'group', redirectTo: 'favorite/group-listing', pathMatch: 'full' },
  
 { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'auth/verif', component: VerifComponent },

  { path: 'auth/loading', component: LoadingComponent },

  
  { path: 'registerEvent', component: EventRegistrationComponent },
  { path: 'confirmation/:id', component: ConfirmationComponent },
  { path: 'scan', component: QrScannerComponent, canActivate: [AdminGuard] },




  {
    path: '',
    redirectTo: 'news-feed-layout/style-1',
    pathMatch: 'full',
  },
  {
    path: 'auth/login',
    component: AuthLoginComponent,  
  },
  {
    path: '',
    component: ContentComponent,
    children: contentRoutes,
    canActivate: [AdminGuard],
  },
  {
    path: '',
    component: FullComponent,
    children: fullRoutes,
    canActivate: [AdminGuard],

  },

  { path: '**', redirectTo: 'company/404' }

];

// Export a provider for AdminGuard since there's no AppModule
export const appRoutingProviders = [
  provideRouter(routes),
  { provide: 'AdminGuard', useClass: AdminGuard }
];