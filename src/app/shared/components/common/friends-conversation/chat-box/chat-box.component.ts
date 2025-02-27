import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.scss'
})

export class ChatBoxComponent {
  
  public isOpen : boolean = false;
  constructor(public commonServices :CommonService) { }


}
