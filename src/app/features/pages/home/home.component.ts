import { Component, signal } from '@angular/core';
import { UserService } from '../../../auth/services/user.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { GalleryItem } from '../../interfaces/gallery-item.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="profile">
      <div>
          <img [src]="profilePhoto || 'avatar.jpg'" alt="avatar" />
          <p>Hola {{ user().username }}!</p>
      </div>
      <div>
          <h2>{{ followers }}</h2>
          seguidores
      </div>
      <div>
          <h2>{{ galleryItems().length }}</h2>
          publicaciones
      </div>
      <div>
          <h2>{{ requests }}</h2>
          solicitudes
      </div>
    </section>
    <section id="gallery">
      <div class="gallery-item" *ngFor="let item of galleryItems()">
        <img [src]="item.url" />
        <div class="comments">
          <input type="text" (change)="onAddComment($event, item.id)"/>
          <a (click)="onViewComments(item.comments)"><i class="fas fa-comments"></i></a>
          <a (click)="onDelete(item.id)"><i class="fas fa-trash-alt"></i></a>
        </div>
      </div>
    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  followers:number = 20
  requests = 150
  profilePhoto = ''

  user;
  galleryItems = signal<GalleryItem[]>([])
  
  constructor(private userService:UserService) {
    this.user = userService.getUser()
    this.galleryItems.set(this.userService.getGallery(this.user().username));
  }
  
  onAddComment(event: Event, id:string){
    const input = event.target as HTMLInputElement
    if(!input.value){
      return;
    }
    this.galleryItems.update(items => {
      let selected = items.find(item => item.id === id)
      if (selected){
        selected!.comments = [...selected!.comments, input.value]
      }
      return items
    })
    this.userService.updateGalleryItem(this.galleryItems(),this.user().username)
    input.value = ''
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

  onDelete(id: string){
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
        Swal.fire('Imagen eliminada', '', 'success')
        this.galleryItems.update(items => items.filter(item => item.id !== id))
        this.userService.updateGalleryItem(this.galleryItems(), this.user().username)
      } else if (result.isDismissed) {
        Swal.fire('Operación cancelada', '', 'info')
      }
    })
  }
}
