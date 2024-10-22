import { Component, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../../auth/services/user.service';
import { v4 as uuidv4 } from 'uuid';
import { PostsService } from '../../services/posts.service';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnDestroy {
  user;
  uploadedUrl = '';
  updated = false
  fileName = '';
  editForm: FormGroup;

  constructor(
    private userService: UserService,
    private postsService: PostsService,
    private fb: FormBuilder
  ) {
    this.user = this.userService.getUser();
    this.editForm = this.fb.group({

    });
  }
  ngOnDestroy(): void {
    if(!this.updated && this.uploadedUrl !== ''){
      this.postsService.deletePhoto(this.fileName, 'profile', this.user().username)
    }
  }

  onUpload(event: Event) {
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Muestra el indicador de carga
      },
    });

    let inputFile = event.target as HTMLInputElement;
    if (!inputFile.files || inputFile.files.length <= 0) {
      return;
    }
    const file: File = inputFile.files[0];
    this.fileName = uuidv4();

    this.postsService
    .uploadFile(file, this.fileName, 'profile', this.user().username)
    .then(data => {
        this.uploadedUrl = data!;

        this.userService.updateUser({
          ...this.user(),
          photo: this.uploadedUrl,
        });

        this.user = this.userService.getUser();

        Swal.close();
        inputFile.value = '';
      })
      .catch(() => {
        Swal.close();
        Swal.fire('Error', 'Ocurrió un error al cargar la foto', 'error');
      });
  }

  onSave() {}
}
