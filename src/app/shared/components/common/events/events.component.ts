import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../services/event.service';
import { FeatherIconComponent } from '../feather-icon/feather-icon.component';

import { CommonService } from '../../../services/common.service';

import { events } from '../../../interface/common';
import { ClickOutSideDirective } from '../../../directives/click-out-side.directive';
import { Event } from '../../../interface/event';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  imports: [FeatherIconComponent, CommonModule, ClickOutSideDirective],
  standalone: true
})

export class EventsComponent {

  public isShow: boolean = false;

 // @Input() events: events;
  @Input() events: events = { class: '' };
  @Input() event!: Event;

  constructor(public modalServices: NgbModal,
    public commonService: CommonService, EventService : EventService) { }

  outSideClose() {
    this.isShow = false;
  }
}
