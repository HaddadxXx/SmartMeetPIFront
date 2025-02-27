// src/app/auth/auth-login/auth-login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { SvgIconComponent } from '../../shared/components/common/svg-icon/svg-icon.component';
import { FeatherIconComponent } from '../../shared/components/common/feather-icon/feather-icon.component';
import { LoadingComponent } from '../../shared/skeleton-loader/widgets/loading/loading.component';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [
    FeatherIconComponent, 
    SvgIconComponent, 
    LoadingComponent,
    RouterModule, 
    ReactiveFormsModule
  ],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent {
  public loginForm: FormGroup;
  public show: boolean = false;
  public errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.router.navigate(['/news-feed-layout/style-1']);
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  showPassword() {
    this.show = !this.show;
  }

  login() {
    this.errorMessage = '';
    
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.signin(email, password).subscribe({
        next: () => {
          this.router.navigate(['/news-feed-layout/style-1']);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Email ou mot de passe incorrect';
        }
      });
    }
  }
}