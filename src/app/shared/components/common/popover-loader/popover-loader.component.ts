import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-popover-loader',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './popover-loader.component.html',
  styleUrl: './popover-loader.component.scss'
})

export class PopoverLoaderComponent {

  @Input() data: any;

}
