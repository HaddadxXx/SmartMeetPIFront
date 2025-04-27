import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AboutIntroMySelfComponent } from '../../../shared/components/common/about-intro-my-self/about-intro-my-self.component';
import { HobbiesInterestComponent } from '../../../shared/components/common/hobbies-interest/hobbies-interest.component';
import { MenuComponent } from '../tab/menu/menu.component';
import { AboutFriendListComponent } from '../widgets/about-friend-list/about-friend-list.component';
import { ProfileMenuComponent } from '../widgets/profile-menu/profile-menu.component';
import { ProfilePagesComponent } from '../widgets/profile-pages/profile-pages.component';

import { CommonService } from '../../../shared/services/common.service';

import { educationWork, hobbyInterests, introMySelfAbout } from '../../../shared/data/profile-pages/about';
import { ProfileAboutSkeletonComponent } from '../../../shared/skeleton-loader/profile-pages-skeleton/profile-about-skeleton/profile-about-skeleton.component';
import { EventService } from '../../../shared/services/event.service';

import { Event
  
 } from '../../../shared/interface/event';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ProfilePagesComponent, ProfileMenuComponent, AboutIntroMySelfComponent,ProfileAboutSkeletonComponent,
    HobbiesInterestComponent, AboutFriendListComponent, MenuComponent , CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})

export class AboutComponent {

  events: Event[] = [];

  public introMySelfAbout = introMySelfAbout;
  public hobbyInterest = hobbyInterests;
  public educationWork = educationWork;
  @Input() currentUrl: string;

  constructor(public commonServices: CommonService,private router: Router , 
    private eventService :EventService
  ) {
    this.currentUrl = this.router.url;
  }
  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (data) => this.events = data,
      error: (err) => console.error('Erreur de chargement des événements', err)
    });
  }

  onDeleteEvent(id: string | undefined): void {
    if (!id) return;
  
    if (confirm('Voulez-vous vraiment supprimer cet événement ?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          this.events = this.events.filter(e => e.idEvent !== id);
        },
        error: err => console.error('Erreur lors de la suppression :', err)
      });
    }
  }
  



  
}
