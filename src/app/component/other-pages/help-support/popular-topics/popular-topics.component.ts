import { Component } from '@angular/core';
import { popularTopics } from '../../../../shared/data/others-pages/messenger';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-popular-topics',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './popular-topics.component.html',
  styleUrl: './popular-topics.component.scss'
})


export class PopularTopicsComponent {
  public popularTopics = popularTopics;

}
