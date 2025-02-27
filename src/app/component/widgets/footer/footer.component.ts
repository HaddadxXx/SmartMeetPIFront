import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { footerRouter } from '../../../shared/data/others-pages/messenger';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})

export class FooterComponent {

  @Input() footerClass: string;
  @Input() logo: string;
  @Input() animation: boolean;

  public footerRouter = footerRouter ;

}
