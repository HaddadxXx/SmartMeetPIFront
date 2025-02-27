import { Component } from '@angular/core';
import { CreatePostComponent } from '../../../../shared/components/common/create-post/create-post.component';

@Component({
  selector: 'app-story-upload',
  templateUrl: './story-upload.component.html',
  styleUrl: './story-upload.component.scss',
  imports : [CreatePostComponent],
  standalone:true,
})

export class StoryUploadComponent {
  
  public isCreatePost: boolean = false;

}
