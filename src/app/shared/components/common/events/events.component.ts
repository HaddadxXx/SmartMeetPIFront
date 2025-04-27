import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { FeatherIconComponent } from '../feather-icon/feather-icon.component';

import { CommonService } from '../../../services/common.service';

//import { events } from '../../../interface/common';
import { ClickOutSideDirective } from '../../../directives/click-out-side.directive';
import { Event } from '../../../interface/event';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../../../services/event.service';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  imports: [FeatherIconComponent, CommonModule,ClickOutSideDirective,ReactiveFormsModule],
  standalone: true
})

export class EventsComponent {

  public isShow: boolean = false;

 //@Input() events: events = { class: '' };
 // @Input() event!: Event;
  @Input() events: Event  ; 
 //@Input() events: Event[] = []; // ✅ Une LISTE d’événements ici

  constructor(public modalServices: NgbModal,
    public commonService: CommonService , public EventService : EventService, private fb: FormBuilder) { }

  outSideClose() {
    this.isShow = false;
  }
}
