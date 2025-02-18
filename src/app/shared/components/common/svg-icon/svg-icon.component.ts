import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [],
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.scss'
})

export class SvgIconComponent {

  @Input("icons") public icons: any;
  @Input("class") public class: any;

}
