import { Component, Input } from '@angular/core';
import { FeatherIconComponent } from '../../../../shared/components/common/feather-icon/feather-icon.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [FeatherIconComponent, RouterModule],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss'
})

export class ProfileMenuComponent {

  @Input() currentUrl!: string;
  groupId!: string;
  ngOnInit() {
    const urlParts = this.currentUrl.split('/');
    this.groupId = urlParts[urlParts.length - 1]; // Prend le dernier segment de l'URL
    console.log('Group ID:', this.groupId);
  }
}
