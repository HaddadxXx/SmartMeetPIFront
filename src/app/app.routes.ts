import { Routes } from '@angular/router';
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
import { LoadingComponent } from './shared/skeleton-loader/widgets/loading/loading.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
 { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'auth/verif', component: VerifComponent },

  //khalil
  { path: 'auth/loading', component: LoadingComponent },

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
