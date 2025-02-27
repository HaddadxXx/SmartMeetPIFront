import { Component } from '@angular/core';
import { CommonCalenderComponent } from '../../../widgets/common-calender/common-calender.component';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  imports: [CommonCalenderComponent],
  standalone: true
})

export class CalendarComponent {

  public isShow: boolean = false;

}
