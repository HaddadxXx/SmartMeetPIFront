import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./backEnd/layout/sidebar/sidebar.component";
import { NavbarComponent } from "./backEnd/layout/navbar/navbar.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'bootstraptoangular19';
  isBackOffice(): boolean {
    return this.router.url.startsWith('/dashboard') 
      || this.router.url.startsWith('/users')
      || this.router.url.startsWith('/backoffice');
  }
  constructor(private router: Router) {}

  showSidebar(): boolean {
    return this.router.url === '/dashboard';
  }
  showNavbar(): boolean {
    return this.router.url === '/dashboard';
  }

  
}
