import { Component, EventEmitter, Output } from '@angular/core';
import { FeatherIconComponent } from '../../feather-icon/feather-icon.component';
import { ClickOutSideDirective } from '../../../../directives/click-out-side.directive';

@Component({
  selector: 'app-create-option',
  standalone: true,
  imports: [FeatherIconComponent,ClickOutSideDirective],
  templateUrl: './create-option.component.html',
  styleUrl: './create-option.component.scss'
})

export class CreateOptionComponent {

  public isShow: boolean = false;
  public isOpen: boolean = false;
  public isPost : boolean ;

  @Output() post: EventEmitter<boolean> = new EventEmitter<boolean>();

  outSideClose() {
    this.isOpen = false;
  }

  outSide() {
    this.isShow = false;
  }

  postButton(){
    this.isPost = true;
    this.post.emit(this.isPost);
  }

}
