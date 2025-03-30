import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-layout',
  standalone: true,
  imports: [SidebarComponent,NavbarComponent,RouterOutlet,CommonModule],
  templateUrl: './back-layout.component.html',
  styleUrl: './back-layout.component.scss'
})
export class BackLayoutComponent {
  constructor() {
    console.log('🚀 BackLayoutComponent chargé !');
  }

   // Fonction showSidebar (exemple basique)
   showSidebar(): boolean {
    console.log('showSidebar called');

    // Logique pour afficher ou non la sidebar
    return true; // Remplace par ta logique
  }

  // Fonction showNavbar (si tu en as une aussi dans ton template)
  showNavbar(): boolean {
    console.log('showNavbar called');

    return true; // Remplace par ta logique
  }

  

}
