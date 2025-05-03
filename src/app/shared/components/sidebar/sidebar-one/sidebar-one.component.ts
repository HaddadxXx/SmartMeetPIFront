import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FeatherIconComponent } from '../../common/feather-icon/feather-icon.component';
import { SvgIconComponent } from '../../common/svg-icon/svg-icon.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NavService, navItems } from '../../../services/nav.service';

import { gamesList } from '../../../data/common';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-sidebar-one',
  standalone: true,
  imports: [FeatherIconComponent, CarouselModule, SvgIconComponent, RouterModule,CommonModule],
  templateUrl: './sidebar-one.component.html',
  styleUrl: './sidebar-one.component.scss'
})
//isleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeem
export class SidebarOneComponent {
  hasSponsor: boolean = false; // propriété pour stocker le résultat

  public menuItems: navItems[];
  public gameList = gamesList;
  roles: any[] = [];
  public optionsData = {
    loop: false,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: false,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 8,
      },
    },
  };

  public imageData = [
    {
      image: 'assets/images/icon/game/1.jpg'
    },
    {
      image: 'assets/images/icon/game/2.jpg'
    },
    {
      image: 'assets/images/icon/game/3.jpg'
    },
    {
      image: 'assets/images/icon/game/4.jpg'
    },
  ]

  constructor(public navServices: NavService,    private authService: AuthService // ou tout autre service qui contient l'utilisateur
  ) { }

  ngOnInit(): void {
    // On récupère l'utilisateur connecté (observable)
    this.authService.getCurrentUser().subscribe(user => {
      this.roles = user.roles; // maintenant 'roles' est accessible ici
  console.log("isleem",user)
console.log("son role",user.roles)
this.hasSponsor = this.roles.some(role => role.name === 'ROLE_SPONSOR');
      console.log(`Vérification du rôle ROLE_SPONSOR : ${this.hasSponsor}`);
    });
  }
  
hasRole(roleName: string): boolean {
  const result = this.roles.some(role => role.name === roleName);
  console.log(`Vérification du rôle ${roleName} : ${result}`);
  return result;
}

  
}