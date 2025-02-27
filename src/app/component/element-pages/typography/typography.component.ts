import { Component } from '@angular/core';

import { LoadingComponent } from '../../../shared/skeleton-loader/widgets/loading/loading.component';
import { DownloadComponent } from '../../widgets/download/download.component';
import { HeaderComponent } from '../../widgets/header/header.component';
import { TitleSectionComponent } from '../../widgets/title-section/title-section.component';
import { AccordionComponent } from './accordion/accordion.component';
import { AlignmentComponent } from './alignment/alignment.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { HeadingsComponent } from './headings/headings.component';
import { InlineTextElementsComponent } from './inline-text-elements/inline-text-elements.component';
import { ListsComponent } from './lists/lists.component';
import { NamingSourceSocialIconsComponent } from './naming-source-social-icons/naming-source-social-icons.component';
import { PopoverThemeComponent } from './popover-theme/popover-theme.component';
import { RadioCheckboxComponent } from './radio-checkbox/radio-checkbox.component';
import { TextColorComponent } from './text-color/text-color.component';
import { ThemeColorComponent } from './theme-color/theme-color.component';
import { ThemeFormComponent } from './theme-form/theme-form.component';
import { ThemePaginationComponent } from './theme-pagination/theme-pagination.component';
import { ThemeSwitchComponent } from './theme-switch/theme-switch.component';

import { Router } from '@angular/router';
import { blogTitle } from '../../../shared/interface/common';
import { FooterComponent } from '../../widgets/footer/footer.component';
import { PopoverComponent } from './popover/popover.component';

@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [TitleSectionComponent, HeaderComponent, ThemeColorComponent,
    HeadingsComponent, ThemeSwitchComponent, TextColorComponent, DropdownComponent,
    ThemePaginationComponent, InlineTextElementsComponent, AlignmentComponent,
    ListsComponent, PopoverThemeComponent, ThemeFormComponent, RadioCheckboxComponent,
    NamingSourceSocialIconsComponent, AccordionComponent, PopoverComponent,
    DownloadComponent, FooterComponent, LoadingComponent],
  templateUrl: './typography.component.html',
  styleUrl: './typography.component.scss'
})

export class TypographyComponent {

  public currentUrl: string;

  public title: blogTitle = {
    title: 'Typography',
    pages: 'typography'
  }

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
  }

}
