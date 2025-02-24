import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { SvgIconComponent } from '../../shared/components/common/svg-icon/svg-icon.component';
import { FeatherIconComponent } from '../../shared/components/common/feather-icon/feather-icon.component';
import { LoadingComponent } from '../../shared/skeleton-loader/widgets/loading/loading.component';
import { NgIf } from '@angular/common'; //A structural directive that conditionally includes a template based on the value of an expression coerced to Boolean.


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    NgIf, 
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
      roles: ['ROLE_USER'] // Valeur par défaut pour ce test
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
      
      const email = this.signupForm.value.email; // Récupère l'email ici

      console.log('Email récupéré:', email);// Vérifie dans la console
      localStorage.setItem('email', email);

      //      khalil
      // VerifMailIfExist  
      //this.router.navigate(['/auth/verif']);

      this.authService.signup(userData).subscribe({
        next: () => {
          this.router.navigate(['/auth/verif']);
        },
        error: (error) => {
          console.error('Erreur backend:', error); // Log de l'erreur
          this.errorMessage = error.error?.message || 'Échec de l\'inscription';
        }
      });
    }
  }
  
}
