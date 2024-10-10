import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { UserService } from '../../../auth/services/user.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [],
  template: `
    <section>
      <label for="fileToUpload">Seleccione un archivo</label>
      <input type="file" (change)="onUpload($event)" id="fileToUpload"/>
      <img [src]="uploadedUrl">  
    </section>
  `,
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {
  userService: UserService;
  postService: PostsService;

  uploadedUrl = ''
  user;

  constructor(private ps: PostsService, private us: UserService){
    this.userService = us;
    this.user = this.userService.getUser();
    this.postService = ps;
  }

  onUpload(event:Event){
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Muestra el indicador de carga
      }
    });
    let inputFile = event.target as HTMLInputElement;
    if(!inputFile.files || inputFile.files.length <= 0){
      return;
    }
    const file:File = inputFile.files[0];
    const filename = uuidv4();
    this.postService.uploadFile(file, filename, this.user().username, 'instapic')
    .then(data => {
      this.uploadedUrl = decodeURIComponent(data!);
      Swal.close();
      inputFile.value = '';
    }).catch(()=>{
      Swal.close();
        Swal.fire('Error', 'Ocurrió un error al cargar los datos', 'error');
    });
  }
}
