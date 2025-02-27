import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../widgets/header/header.component';
import { TitleSectionComponent } from '../../widgets/title-section/title-section.component';
import { ThemeButtonsComponent } from './theme-buttons/theme-buttons.component';
import { ButtonTagsComponent } from './button-tags/button-tags.component';
import { ButtonTextSizesComponent } from './button-text-sizes/button-text-sizes.component';
import { ButtonGroupComponent } from './button-group/button-group.component';
import { ButtonBlockComponent } from './button-block/button-block.component';
import { ButtonOutlineComponent } from './button-outline/button-outline.component';
import { BootstrapButtonComponent } from './bootstrap-button/bootstrap-button.component';
import { DownloadComponent } from '../../widgets/download/download.component';
import { LoadingComponent } from '../../../shared/skeleton-loader/widgets/loading/loading.component';
import { FooterComponent } from '../../widgets/footer/footer.component';

import { blogTitle } from '../../../shared/interface/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [HeaderComponent, TitleSectionComponent, ThemeButtonsComponent,
    ButtonTagsComponent, ButtonTextSizesComponent, ButtonGroupComponent,
    ButtonBlockComponent, ButtonOutlineComponent, BootstrapButtonComponent,
    DownloadComponent, FooterComponent, LoadingComponent],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss'
})

export class ButtonsComponent {

  public currentUrl: string;

  public title: blogTitle = {
    title: 'Buttons',
    pages: 'buttons'
  }

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
  }

}
