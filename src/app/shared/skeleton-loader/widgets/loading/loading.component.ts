import { Component } from '@angular/core';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})

export class LoadingComponent {

  constructor(public commonServices : CommonService) {}

}
