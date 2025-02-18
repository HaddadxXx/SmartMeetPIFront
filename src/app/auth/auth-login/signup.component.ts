import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { SvgIconComponent } from '../../shared/components/common/svg-icon/svg-icon.component';
import { FeatherIconComponent } from '../../shared/components/common/feather-icon/feather-icon.component';
import { LoadingComponent } from '../../shared/skeleton-loader/widgets/loading/loading.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FeatherIconComponent, 
    SvgIconComponent, 
    LoadingComponent,
    RouterModule, 
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  
})
export class SignupComponent {
  public signupForm: FormGroup;
  public show: boolean = false;
  public errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: ['ROLE_ADMIN'] // Valeur par défaut pour ce test
    });
  }

  showPassword() {
    this.show = !this.show;
  }

  signup() {
    this.errorMessage = '';
  
    if (this.signupForm.valid) {
      const userData = {
        ...this.signupForm.value,
        roles: [this.signupForm.value.roles] // Convertir la valeur en tableau
      };
  
      console.log('Données envoyées:', userData); // Vérifie dans la console
  
      this.authService.signup(userData).subscribe({
        next: () => {
          this.router.navigate(['/auth/auth-login']);
        },
        error: (error) => {
          console.error('Erreur backend:', error); // Log de l'erreur
          this.errorMessage = error.error?.message || 'Échec de l\'inscription';
        }
      });
    }
  }
  
}
