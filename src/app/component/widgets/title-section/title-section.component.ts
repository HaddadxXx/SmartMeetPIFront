import { Component, Input } from '@angular/core';
import { blogTitle } from '../../../shared/interface/common';
import { CommonModule } from '@angular/common';
import { AnimationEmojiComponent } from '../animation-emoji/animation-emoji.component';

@Component({
  selector: 'app-title-section',
  standalone: true,
  imports: [AnimationEmojiComponent,CommonModule],
  templateUrl: './title-section.component.html',
  styleUrl: './title-section.component.scss'
})

export class TitleSectionComponent {

  @Input() title: blogTitle;

}
