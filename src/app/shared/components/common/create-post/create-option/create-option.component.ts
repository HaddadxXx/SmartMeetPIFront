import { Component, EventEmitter, Output } from '@angular/core';
import { FeatherIconComponent } from '../../feather-icon/feather-icon.component';
import { ClickOutSideDirective } from '../../../../directives/click-out-side.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-option',
  standalone: true,
  imports: [FeatherIconComponent, ClickOutSideDirective],
  templateUrl: './create-option.component.html',
  styleUrls: ['./create-option.component.scss']
})
export class CreateOptionComponent {

  public isShow: boolean = false;
  public isOpen: boolean = false;
  public isPost: boolean;

  @Output() post: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  outSideClose() {
    this.isOpen = false;
  }

  outSide() {
    this.isShow = false;
  }

  postButton() {
    this.isPost = true;
    this.post.emit(this.isPost);
  }

  modifyPost() {
    console.log('Modifier le post');
    this.router.navigate(['/modifier-post']);
  }

  editProfile() {
    this.router.navigate(['/profile/timeline']);
  }
}
