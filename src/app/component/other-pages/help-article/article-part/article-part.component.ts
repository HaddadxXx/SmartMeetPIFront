import { Component } from '@angular/core';
import { existingEmail } from '../../../../shared/data/others-pages/others-pages';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-article-part',
  standalone: true,
  imports: [NgbAccordionModule],
  templateUrl: './article-part.component.html',
  styleUrl: './article-part.component.scss'
})

export class ArticlePartComponent {

  public items = ['Choose a new username', 'Check if you already have a Friendbook Account', 'Check where email notifications are sent']
  public existingEmail = existingEmail;

}
