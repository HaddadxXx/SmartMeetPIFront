import { Component } from '@angular/core';
import { HeaderOneComponent } from '../../../shared/components/common/header/header-one/header-one.component';
import { MessengerSectionComponent } from './messenger-section/messenger-section.component';
import { LoadingComponent } from '../../../shared/skeleton-loader/widgets/loading/loading.component';

@Component({
  selector: 'app-messenger',
  standalone: true,
  imports: [HeaderOneComponent,MessengerSectionComponent,LoadingComponent],
  templateUrl: './messenger.component.html',
  styleUrl: './messenger.component.scss'
})

export class MessengerComponent {

}
