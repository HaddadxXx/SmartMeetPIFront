import { Component } from '@angular/core';

@Component({
  selector: 'app-animation-emoji',
  standalone: true,
  imports: [],
  templateUrl: './animation-emoji.component.html',
  styleUrl: './animation-emoji.component.scss'
})

export class AnimationEmojiComponent {

  public emojiAnimations = [
    {
      image: 'assets/images/breadcrumb/1.png'
    },
    {
      image: 'assets/images/breadcrumb/2.png'
    },
    {
      image: 'assets/images/breadcrumb/3.png'
    },
    {
      image: 'assets/images/breadcrumb/4.png'
    },
    {
      image: 'assets/images/breadcrumb/5.png'
    },
    {
      image: 'assets/images/breadcrumb/6.png'
    },
    {
      image: 'assets/images/breadcrumb/7.png'
    },
    {
      image: 'assets/images/breadcrumb/8.png'
    },
    {
      image: 'assets/images/breadcrumb/9.png'
    },
  ]


}
