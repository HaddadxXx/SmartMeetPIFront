import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../../../shared/components/common/feather-icon/feather-icon.component';
import { UserService } from '../../../../../shared/services/user.service';
import { relationshipStatus } from '../../../../../shared/data/profile-pages/time-line';
import { SvgIconComponent } from '../../../../../shared/components/common/svg-icon/svg-icon.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../../shared/services/auth.service';



@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeatherIconComponent,
    SvgIconComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})

export class EditProfileComponent {

  public relationshipStatus = relationshipStatus;
  public profileForm!: FormGroup;
  public selectedFile: File | null = null;
  constructor(public modalServices: NgbModal,private userService: UserService,    private fb: FormBuilder,    private authService: AuthService,

  ) { }



  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      expertiseArea: [''],
      interests: [''],
    });

    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        // Préremplir le formulaire avec les données de l'utilisateur
        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          expertiseArea: user.expertiseArea,
          interests: user.interests,
        });
      },
      error: (err) => {
        console.error('Erreur récupération utilisateur', err);
      }
    });
  }



  
  imagePreviewUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file;
  
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  getProfileImage(photo: string | null): string {
    return photo 
<<<<<<< HEAD
      ? `url('http://localhost:8080/uploads/profilimages/${photo}')` 
      : `url('http://localhost:8080/uploads/default.png')`;
=======
      ? `url('http://localhost:8889/uploads/${photo}')` 
      : `url('http://localhost:8889/uploads/default.png')`;
>>>>>>> NEW_Event_Session
  }
    

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.userService.updateProfile(this.profileForm.value,  this.selectedFile ?? undefined)
        .subscribe({
          next: (response) => {
            console.log('Profil mis à jour :', response);
          },
          error: (error) => {
            console.log(this.profileForm)
            console.error('Erreur lors de la mise à jour :', error);
          }
        });
    }
  }

}

