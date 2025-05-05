import { Component, OnInit, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Story } from '../../../interface/post';
import { StoryUploadComponent } from '../story-upload/story-upload.component';
import { PostService } from '../../../services/news-feed-layout/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-stories',
  templateUrl: './add-stories.component.html',
  styleUrl: './add-stories.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class AddStoriesComponent implements OnInit {
  modalServices = inject(NgbModal);

  public storyData: Story[] = [];
  public selectedStory: Story | null = null;
  public emoji = [
    { svg: 'assets/svg/emoji/040.svg' },
    { svg: 'assets/svg/emoji/113.svg' },
    { svg: 'assets/svg/emoji/027.svg' },
    { svg: 'assets/svg/emoji/052.svg' },
    { svg: 'assets/svg/emoji/039.svg' },
    { svg: 'assets/svg/emoji/042.svg' },
  ];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadStories();
  }

  loadStories() {
    this.postService.getStories().subscribe((stories: Story[]) => {
      this.storyData = stories;
      if (stories.length > 0) {
        this.selectedStory = stories[0];
      }
    });
  }

  selectStory(story: Story) {
    this.selectedStory = story;
  }

  uploadStory() {
    const modalRef = this.modalServices.open(StoryUploadComponent, { centered: true });
    modalRef.closed.subscribe(() => this.loadStories());
  }

  getHoursAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    return diff.toString();
  }


  
}
