import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../../../shared/components/common/feather-icon/feather-icon.component';
import { SvgIconComponent } from '../../../../../shared/components/common/svg-icon/svg-icon.component';
import { ChoosePhotoComponent } from '../choose-photo/choose-photo.component';
import { relationshipStatus } from '../../../../../shared/data/profile-pages/time-line';
import {  UserService } from '../../../../../shared/services/user.service';
import { ReactiveFormsModule } from '@angular/forms'; // ← à importer


@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FeatherIconComponent, SvgIconComponent,ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  public relationshipStatus = relationshipStatus;
  public profileForm: FormGroup;

  // Optionnel : si vous gérez le changement d’image
  public selectedFile: File | null = null;

  constructor(
    public modalServices: NgbModal,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      expertiseArea: ['', Validators.required],
      interests: ['', Validators.required]
    });
  }

  editImage() {
    this.modalServices.open(ChoosePhotoComponent, { size: 'lg', windowClass: 'Choose-photo-modal' });
  }

  // Appelée lors de la sauvegarde (via le bouton "save changes")
  onSubmit() {
    if (this.profileForm.invalid) {
      // Vous pouvez ajouter ici un affichage d’erreur
      return;
    }

    const formValues = this.profileForm.value;
    // Construction de l'objet user, complété avec vos autres données statiques ou en récupérant d'autres données
    const user: any = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      expertiseArea: formValues.expertiseArea,
      interests: formValues.interests
    };
    

    // Appel du service. On passe selectedFile si vous l’avez sélectionné au préalable via votre méthode d’upload
    this.userService.updateUserProfile(user, this.selectedFile || undefined)
      .subscribe({
        next: updatedUser => {
          // Gérer la réponse, par exemple fermer la modale et notifier l’utilisateur
          console.log('Profil mis à jour', updatedUser);
          this.modalServices.dismissAll();
        },
        error: err => {

          console.error('Erreur lors de la mise à jour du profilssssss', err);
        }
      });
  }
}
