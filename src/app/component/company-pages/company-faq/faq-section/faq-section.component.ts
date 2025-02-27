import { Component } from '@angular/core';

import { AccordionComponent } from './accordion/accordion.component';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [AccordionComponent],
  templateUrl: './faq-section.component.html',
  styleUrl: './faq-section.component.scss'
})
export class FaqSectionComponent {

}
