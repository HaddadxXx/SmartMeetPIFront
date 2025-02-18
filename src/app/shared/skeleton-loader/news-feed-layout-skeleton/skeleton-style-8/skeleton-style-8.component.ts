import { Component } from '@angular/core';
import { CreatePostSkeletonComponent } from '../../widgets/create-post-skeleton/create-post-skeleton.component';
import { LikePageSkeletonComponent } from '../../widgets/like-page-skeleton/like-page-skeleton.component';
import { PostPanelSkeletonComponent } from '../../widgets/post-panel-skeleton/post-panel-skeleton.component';
import { ProfileBoxSkeletonComponent } from '../../widgets/profile-box-skeleton/profile-box-skeleton.component';
import { StorySkeletonComponent } from '../../widgets/story-skeleton/story-skeleton.component';
import { SuggestionBoxSkeletonComponent } from '../../widgets/suggestion-box-skeleton/suggestion-box-skeleton.component';
import { HeaderThreeComponent } from "../../widgets/header/header-three/header-three.component";

@Component({
    selector: 'app-skeleton-style-8',
    standalone: true,
    templateUrl: './skeleton-style-8.component.html',
    styleUrl: './skeleton-style-8.component.scss',
    imports: [StorySkeletonComponent, ProfileBoxSkeletonComponent, SuggestionBoxSkeletonComponent,
        LikePageSkeletonComponent, CreatePostSkeletonComponent, PostPanelSkeletonComponent, HeaderThreeComponent]
})
export class SkeletonStyle8Component {

}
