import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../services/event.service';
import { FeatherIconComponent } from '../feather-icon/feather-icon.component';

import { CommonService } from '../../../services/common.service';

import { events } from '../../../interface/common';
import { ClickOutSideDirective } from '../../../directives/click-out-side.directive';
import { Event } from '../../../interface/event';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EventComponent } from '../../../../component/other-pages/event/event.component';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  imports: [FeatherIconComponent, CommonModule, ClickOutSideDirective, ReactiveFormsModule,EventComponent],
  standalone: true
})

export class EventsComponent {
// openParticipationModal(_t41: any) {
// throw new Error('Method not implemented.');
// }

  public isShow: boolean = false;



 // @Input() events: events;
  @Input() events: events = { class: '' };
  @Input() event!: Event;

  @Output() participationEvent = new EventEmitter<Event>();

  constructor(public modalServices: NgbModal,
    public commonService: CommonService, EventService : EventService, private fb: FormBuilder ) { }


    openParticipationModal(event: Event) {
      this.participationEvent.emit(event);
    }
   
  outSideClose() {
    this.isShow = false;
  }
}
