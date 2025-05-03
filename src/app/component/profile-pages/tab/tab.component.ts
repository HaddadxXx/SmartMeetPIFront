import { Component } from '@angular/core';
import { ProfilePagesComponent } from '../widgets/profile-pages/profile-pages.component';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [ProfilePagesComponent,MenuComponent],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})

export class TabComponent {

}
