import { Component, EventEmitter, Output } from '@angular/core';
import { FeatherIconComponent } from '../../feather-icon/feather-icon.component';
import { ClickOutSideDirective } from '../../../../directives/click-out-side.directive';
import { FormsModule } from '@angular/forms'; // Importez FormsModule


@Component({
  selector: 'app-create-option',
  standalone: true,
  imports: [FeatherIconComponent,ClickOutSideDirective , FormsModule],
  templateUrl: './create-option.component.html',
  styleUrl: './create-option.component.scss'
})

export class CreateOptionComponent {

  public isShow: boolean = false;
  public isOpen: boolean = false;
  public isPost : boolean ;
  public localContent: string = '';

  @Output() post: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() contentUpdate: EventEmitter<string> = new EventEmitter<string>();
  
  outSideClose() {
    this.isOpen = false;
  }

  outSide() {
    this.isShow = false;
  }

  postButton(){
    this.isPost = true;
    this.post.emit(this.isPost);
    this.contentUpdate.emit(this.localContent); // Émet le contenu de l'input vers le parent
  }

  onInputChange(event: Event) {
    this.localContent = (event.target as HTMLInputElement).value;
    this.contentUpdate.emit(this.localContent); // Émet le contenu en temps réel
  }

}
