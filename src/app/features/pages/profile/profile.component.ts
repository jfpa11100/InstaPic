import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../../auth/services/user.service';
import { v4 as uuidv4 } from 'uuid';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  template: `
    <section>
      <label>Foto de perfil:</label>
      <label class="photo" for="photo">
        <img title="Change" [src]="uploadedUrl">
      </label>
      <input style="display: none;" type="file" id="photo" (change)="onUpload($event)">
    </section>
  `,
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  uploadedUrl: string;
  user;

  constructor(private userService: UserService, private postsService: PostsService) {
    this.user = this.userService.getUser();
    this.uploadedUrl = this.user().photo || 'avatar.jpg'
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
    const fileName = uuidv4();

    this.postsService
      .uploadFile(file, fileName, 'profile', this.user().username)
      .then(data => {
        this.uploadedUrl = data!;

        this.userService.updateUser({ ...this.user(), photo:this.uploadedUrl });

        this.user = this.userService.getUser(); 

        Swal.close();
        inputFile.value = '';
      })
      .catch(() => {
        Swal.close();
        Swal.fire('Error', 'Ocurrió un error al cargar la foto', 'error');
      });
  }
}
