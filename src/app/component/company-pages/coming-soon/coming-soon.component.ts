import { Component } from '@angular/core';

import { AnimationEmojiComponent } from '../../widgets/animation-emoji/animation-emoji.component';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [AnimationEmojiComponent],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.scss'
})

export class ComingSoonComponent {

  public seconds: number;
  public interval: any;

  constructor() {
    this.interval = setInterval(function (this: any) {
      let currentDate = new Date();
      currentDate.setHours(0); 
      currentDate.setMinutes(0);
      currentDate.setSeconds(0);
      let nowDate = new Date();
      let daysToAdd = 7;
      currentDate.setDate(currentDate.getDate() + daysToAdd);
      let distance = currentDate.getTime() - nowDate.getTime();
      this.document.querySelectorAll('#days').forEach((element: { innerHTML: number; }) => {
        element.innerHTML = Math.floor(distance / (1000 * 60 * 60 * 24));
      });

      this.document.querySelectorAll('#hours').forEach((element: { innerHTML: number; }) => {
        element.innerHTML = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      });

      this.document.querySelectorAll('#minutes').forEach((element: { innerHTML: number; }) => {
        element.innerHTML = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      });

      this.document.querySelectorAll('#seconds').forEach((element: { innerHTML: number; }) => {
        element.innerHTML = Math.floor((distance % (1000 * 60)) / 1000);
      });
    }, this.seconds);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

}
