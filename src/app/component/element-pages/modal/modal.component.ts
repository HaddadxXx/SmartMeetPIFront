import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OpenModalComponent } from '../../../shared/components/common/gallery/open-modal/open-modal.component';
import { AddStoriesComponent } from '../../../shared/components/modal/add-stories/add-stories.component';
import { ShareComponent } from '../../../shared/components/modal/share/share.component';
import { blogTitle } from '../../../shared/interface/common';
import { CommonService } from '../../../shared/services/common.service';
import { HeaderComponent } from '../../widgets/header/header.component';
import { TitleSectionComponent } from '../../widgets/title-section/title-section.component';
import { ChoosePhotoComponent } from '../../profile-pages/widgets/model/choose-photo/choose-photo.component';
import { EditProfileComponent } from '../../profile-pages/widgets/model/edit-profile/edit-profile.component';
import { VideoPlayerComponent } from '../../../shared/components/common/events/video-player/video-player.component';
import { LoadingComponent } from '../../../shared/skeleton-loader/widgets/loading/loading.component';
import { Router } from '@angular/router';
import { FooterComponent } from "../../widgets/footer/footer.component";
import { DownloadComponent } from "../../widgets/download/download.component";

@Component({
    selector: 'app-modal',
    standalone: true,
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss',
    imports: [HeaderComponent, TitleSectionComponent, LoadingComponent, FooterComponent, DownloadComponent]
})

export class ModalComponent {

  public currentUrl: string;

  constructor(public modal: NgbModal, public commonServices: CommonService ,private router: Router) { 
    this.currentUrl = this.router.url;

  }

  public title: blogTitle = {
    title: 'Element Modal',
    pages: 'element modal'
  }

  storyModal() {
    this.modal.open(AddStoriesComponent, {
      fullscreen: true,
      windowClass: 'story-model',
    })
  }

  sharePost() {
    this.modal.open(ShareComponent, {
      centered: true
    })
  }

  gallery() {
    this.modal.open(OpenModalComponent, { fullscreen: true, windowClass: 'comment-model'})
  }

  videoView() {
    this.modal.open(VideoPlayerComponent,{
      size: 'lg',
      centered: true
    });
  }

  editProfile() {
    this.modal.open(EditProfileComponent, { size: 'lg' })
  }

  choosePhoto(){
    this.modal.open(ChoosePhotoComponent, { size: 'lg', windowClass: 'Choose-photo-modal' })
  }

}
