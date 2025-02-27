import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ✅ Importation de FormsModule

import { LoadingComponent } from '../../shared/skeleton-loader/widgets/loading/loading.component';
import { AnimationEmojiComponent } from '../../component/widgets/animation-emoji/animation-emoji.component';

@Component({
  selector: 'app-verif',
  standalone: true,
  imports: [CommonModule, FormsModule,LoadingComponent,AnimationEmojiComponent], // ✅ Ajouter FormsModule ici
  templateUrl: './verif.component.html'
})
export class VerifComponent {
  code: string = '';
  email: string = ''; // Ajout de l'email pour l'envoi à la méthode
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // ✅ Récupérer l'email stocké
    this.email = localStorage.getItem('email') || '';

    if (!this.email) {
      this.errorMessage = "L'email n'a pas été trouvé. Veuillez recommencer.";
    }}

  // Méthode pour vérifier le code
  verifyCode() {
    // Assure-toi que l'email est défini, sinon récupère-le comme tu le souhaites
    // Par exemple, tu peux récupérer l'email de la page précédente, du localStorage, etc.
    
    if (this.email && this.code) {
      this.authService.verifySignupCode(this.email, this.code).subscribe({
        next: (response) => {
          alert('Code vérifié avec succès !');

          localStorage.removeItem('email');

          this.router.navigate(['/auth/auth-login']); // Redirection après succès
        },
        error: (error) => {
          this.errorMessage = 'Code invalide ou expiré. Veuillez réessayer.';
        }
      });
    } else {
      this.errorMessage = 'Veuillez entrer un email et un code valides.';
    }
  }
}
