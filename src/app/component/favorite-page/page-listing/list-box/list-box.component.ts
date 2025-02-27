import { Component, Input } from '@angular/core';
import { pageListing, pageListingImg } from '../../../../shared/data/favorite-page/favorite-page';
import { CommonModule } from '@angular/common';
import { images } from '../../../../shared/interface/common';

@Component({
  selector: 'app-list-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-box.component.html',
  styleUrl: './list-box.component.scss'
})

export class ListBoxComponent {

  @Input() data :pageListingImg;

}
