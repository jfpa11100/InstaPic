import { Component, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../../auth/services/user.service';
import { v4 as uuidv4 } from 'uuid';
import { PostsService } from '../../services/posts.service';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../../auth/interfaces/user.interface';

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
  updated = false;
  fileName = '';
  editForm: FormGroup;

  constructor(
    private userService: UserService,
    private postsService: PostsService,
    private fb: FormBuilder
  ) {
    this.user = this.userService.getUser();
    this.editForm = this.fb.group({
      name: [this.user().name],
      email: [this.user().email || ''],
      password: [''],
      rePassword: [''],
    });
  }
  ngOnDestroy(): void {
    if (!this.updated && this.uploadedUrl !== '') {
      this.postsService.deletePhoto(
        this.fileName,
        'profile',
        this.user().username
      );
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
      .then((data) => {
        this.uploadedUrl = data!;
        Swal.close();
        inputFile.value = '';
      })
      .catch(() => {
        Swal.close();
        Swal.fire('Error', 'Ocurrió un error al cargar la foto', 'error');
      });
  }

  onSave() {
    const name = this.editForm.value.name || '';
    const email = this.editForm.value.email || '';
    const newPassword = this.editForm.value.password;
    const rePassword = this.editForm.value.rePassword;

    let userUpdate: User = {
      username: this.user().username,
      name: name ? name : this.user().name,
      photo: this.uploadedUrl ? this.uploadedUrl : this.user().photo,
      email: email && email.length > 8 ? email : this.user().email,
    };

    if (newPassword !== rePassword) {
      Swal.fire({
        icon: 'error',
        text: 'Contraseñas no coinciden',
      });
      return;
    }

    if (newPassword === rePassword && newPassword.length > 8) {
      userUpdate.password = newPassword;
    }
    if (this.user().photo){
      this.postsService.deletePhoto(
        this.getFilePathFromUrl(this.user().photo!),
        'profile',
        this.user().username
      );
    }
    this.userService.updateUser(userUpdate);
    this.updated = true;
    Swal.fire({
      icon: 'success',
      text: 'Usuario actualizado',
    });
    this.user = this.userService.getUser();
    this.editForm.reset()
  }

  getFilePathFromUrl(url: string): string {
    const urlParts = url.split('/');
    return urlParts.slice(-1)[0];
  }
}
