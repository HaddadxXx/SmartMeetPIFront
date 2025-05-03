import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
  imports:[],
  standalone:true
})

export class VideoPlayerComponent {

  @Input() url: string;
  public videoUrl = 'https://www.youtube.com/embed/TKnufs85hXk';
  safeVideoUrl: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) {
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }


}
