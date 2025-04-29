import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { InscriptionService, Inscription } from '../../../../shared/services/inscription.service';

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrls: ['./event-registration.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class EventRegistrationComponent {
  userId = '67fc039e7eb81e09bf0d89e6'; // Replace with logged-in user's ID
  eventId = '68036bc77bfec00239f80257'; // Replace with selected event's ID
  errorMessage = '';

  constructor(private inscriptionService: InscriptionService, private router: Router) {}

  register() {
    this.inscriptionService.registerForEvent(this.userId, this.eventId).subscribe({
      next: (inscription: Inscription) => {
        this.router.navigate(['/confirmation', inscription.id]);
      },
      error: (err) => {
        this.errorMessage = 'Registration failed: ' + err.message;
      }
    });
  }
}