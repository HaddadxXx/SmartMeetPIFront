import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { topFiveGames } from '../../../../shared/interface/games';

import { EventComponent } from '../../event/event.component';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';
import { EventSectionComponent } from '../../../../shared/components/common/event-section/event-section.component';

import { GamesService } from '../../../../shared/services/games.service';
import { ClickOutSideDirective } from '../../../../shared/directives/click-out-side.directive';

@Component({
  selector: 'app-top-5-games',
  standalone: true,
  imports: [FeatherIconComponent, EventComponent, CommonModule
    , EventSectionComponent,ClickOutSideDirective],
  templateUrl: './top-5-games.component.html',
  styleUrl: './top-5-games.component.scss'
})

export class Top5GamesComponent {

  public isShow: boolean = false;
  public topFiveGames: topFiveGames[];
  public class: string = 'ratio2_3';
  constructor(public gamesServices: GamesService) {
  }

  ngOnInit() {
    this.gamesServices.topFiveGames().subscribe(response => {
      if (response.topFiveGames) {
        this.topFiveGames = response.topFiveGames;
      }
    })
  }

  active(item: topFiveGames) {
    return item.active = !item.active
  }

  outSideClose(){
      this.isShow = false;
  }

}
