import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OfferComponent } from "../../offers/offer.component";
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, OfferComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isDarkMode: boolean = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }
}
