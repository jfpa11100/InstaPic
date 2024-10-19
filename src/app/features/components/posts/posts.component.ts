import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { GalleryItem } from '../../interfaces/gallery-item.interface';
import { UserService } from '../../../auth/services/user.service';
import Swal from 'sweetalert2';
import { PostItemComponent } from "../post-item/post-item.component";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, PostItemComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  galleryItems = signal<GalleryItem[]>([])
  
  constructor(private userService: UserService) {
    this.userService.getGallery().subscribe(this.galleryItems.set);
  }

  onAddComment(event: Event, id:string){
    const input = event.target as HTMLInputElement;
    if(!input.value){
      return;
    }
    this.userService.addComment(id, input.value).subscribe(this.galleryItems.set);
    input.value = '';
  }

  onViewComments(comments: string[]){
    let htmlText = 'Aun no hay comentarios'
    if(comments.length > 0){
      htmlText = '<div>'
      comments.forEach(comment => {
        htmlText += `<p>${comment}</p>`
      })
      htmlText += '</div>'
    }
    Swal.fire({
      html: htmlText
    })
  }

  onDeletePost(id: string){
    Swal.fire({
      text: 'Está seguro de eliminar la imagen',
      icon: 'warning',
      showCancelButton: true,
      iconColor: '219ebc',
      confirmButtonColor: '#023047',
      cancelButtonColor: '#d00000',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        this.userService.deletePost(id).subscribe(this.galleryItems.set);
        Swal.fire('Imagen eliminada', '', 'success')
      } else if (result.isDismissed) {
        Swal.fire('Operación cancelada', '', 'info')
      }
    })
  }
  
}
