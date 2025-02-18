import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesService } from '../../../../shared/services/games.service';

import { allGames } from '../../../../shared/interface/games';

export interface categoryData {
  category: string;
  value: string;
}

@Component({
  selector: 'app-all-games',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-games.component.html',
  styleUrl: './all-games.component.scss'
})

export class AllGamesComponent {

  public openTab: string = "all";
  public allGames: allGames[];
  public filterData: allGames[];

  public tabData = [{ category: 'all', value: 'show all' },
  { category: 'action', value: 'action' },
  { category: 'adventure', value: 'adventure' },
  { category: 'simulation', value: 'simulation' },
  { category: 'strategy', value: 'strategy' },
  { category: 'kids', value: 'kids' },
  ];

  constructor(public gamesServices: GamesService) { }

  ngOnInit() {
    this.gamesServices.allGames().subscribe(response => {
      if (response.allGamesData) {
        this.allGames = response.allGamesData;
      }
    })
  }

  public changeTab(value: string) {
    this.openTab = value;
    this.filterData = value !== 'all' ? this.allGames.filter((data) => {
      return data.type == this.openTab ? true : false;
    }) : this.allGames;
  }

}
