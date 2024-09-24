import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../../auth/services/user.service';
import { PostsService } from '../../services/posts.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  template: `
    <section>
      <label for="fileToUpload">Seleccione un archivo</label>
      <input type="file" (change)="onUpload($event)" id="fileToUpload"/>
      <img [src]="uploadedUrl">  
    </section>
  `,
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  uploadedUrl: string = '';
  userService: UserService
  postService: PostsService
  user;

  constructor(us:UserService, ps:PostsService){
    this.userService = us;
    this.postService = ps;
    this.user = this.userService.getUser();
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
    const filename = uuidv4()
    this.postService.uploadFile(file, filename, this.user().username, 'profile')
    .then(data => {
      this.uploadedUrl = data!;
      this.userService.saveGalleryItem({ id:filename, url:this.uploadedUrl, comments:[] }, this.user().username);
      Swal.close();
      inputFile.value = '';
    }).catch(()=>{
      Swal.close();
        Swal.fire('Error', 'Ocurrió un error al cargar los datos', 'error');
    });
  }
}

