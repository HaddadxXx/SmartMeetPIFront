import { Component, Input } from '@angular/core';
import { FeatherIconComponent } from '../feather-icon/feather-icon.component';
import { CommonModule } from '@angular/common';
import { ClickOutSideDirective } from '../../../directives/click-out-side.directive';
import { CreateOptionComponent } from './create-option/create-option.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FeatherIconComponent, CreateOptionComponent, CommonModule, ClickOutSideDirective],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})

export class CreatePostComponent {

  @Input() isCreatePost: boolean;

  public SelectedColor: string;
  public isColor: boolean = false;
  public class: string;
  public isPost: boolean;
  public color = [
    {
      class: 'gr-1'
    },
    {
      class: 'gr-2'
    },
    {
      class: 'gr-3'
    },
    {
      class: 'gr-4'
    },
    {
      class: 'gr-5'
    },
    {
      class: 'gr-6'
    },
    {
      class: 'gr-7'
    },
    {
      class: 'gr-8'
    },
    {
      class: 'gr-9'
    },
    {
      class: 'gr-10'
    },
    {
      class: 'gr-11'
    },
    {
      class: 'gr-12'
    },
    {
      class: 'gr-13'
    },
    {
      class: 'gr-14'
    },
    {
      class: 'gr-15'
    },
  ]

  change(value: string) {
    this.class = value;
  }

  changeColor(item: string) {
    this.SelectedColor = item;
    this.isColor = true;
  }

  getPost(value: boolean) {
    this.isPost =  value;
  }

}
