import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeSettingsComponent } from '../../theme-settings/theme-settings.component';
import { TapTopComponent } from "../../tap-top/tap-top.component";

@Component({
    selector: 'app-full',
    standalone: true,
    templateUrl: './full.component.html',
    styleUrl: './full.component.scss',
    imports: [RouterModule, CommonModule, ThemeSettingsComponent, TapTopComponent]
})

export class  FullComponent {

}
  