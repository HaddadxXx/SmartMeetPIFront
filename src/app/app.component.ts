import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./backEnd/layout/sidebar/sidebar.component";
import { NavbarComponent } from "./backEnd/layout/navbar/navbar.component";
import { Router } from '@angular/router';
import { OfferComponent } from "./backEnd/offers/offer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, NavbarComponent, OfferComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'bootstraptoangular19';
  isBackOffice(): boolean {
    return this.router.url.startsWith('/dashboard') 
      || this.router.url.startsWith('/users')
      || this.router.url.startsWith('/backoffice')
      || this.router.url.startsWith('/event')
      || this.router.url.startsWith('/offers')
      || this.router.url.startsWith('/sessions')
      || this.router.url.startsWith('/partipations');

      

  }
  constructor(private router: Router) {}

  showSidebar(): boolean {
    return this.router.url === '/dashboard';
  }
  showNavbar(): boolean {
    return this.router.url === '/dashboard';
  }

  
}
