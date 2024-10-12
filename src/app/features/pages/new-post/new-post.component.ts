import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { UserService } from '../../../auth/services/user.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [],
  template: `
    <section>
      <div>
        <form>
          <input
            type="file"
            name="file"
            id="file"
            (change)="onUpload($event)"
            class="inputfile"
          />
          <label for="file">Seleccionar archivo...</label>
        </form>
      </div>
      <img [src]="uploadedUrl" />
    </section>
  `,
  styleUrl: './new-post.component.css',
})
export class NewPostComponent {
  uploadedUrl = '';
  user;

  constructor(
    private postsService: PostsService,
    private userService: UserService
  ) {
    this.user = this.userService.getUser();
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
      .uploadFile(file, fileName, this.user().username)
      .then(data => {
        this.uploadedUrl = data!;

        this.userService.saveGalleryItem(
          {
            id: fileName,
            url: this.uploadedUrl,
            comments: [],
          },
          this.user().username
        );

        Swal.close();
        inputFile.value = '';
      })
      .catch(() => {
        Swal.close();
        Swal.fire('Error', 'Ocurrió un error al cargar los datos', 'error');
      });
  }
}
