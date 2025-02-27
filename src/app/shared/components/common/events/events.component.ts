import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { FeatherIconComponent } from '../feather-icon/feather-icon.component';

import { CommonService } from '../../../services/common.service';

import { events } from '../../../interface/common';
import { ClickOutSideDirective } from '../../../directives/click-out-side.directive';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  imports: [FeatherIconComponent, CommonModule, ClickOutSideDirective],
  standalone: true
})

export class EventsComponent {

  public isShow: boolean = false;

  @Input() events: events;

  constructor(public modalServices: NgbModal,
    public commonService: CommonService) { }

  outSideClose() {
    this.isShow = false;
  }
}
