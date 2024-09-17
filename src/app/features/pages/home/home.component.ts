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
          <img src="avatar.jpg" alt="avatar" />
          <p>Hola {{ currentUser.username }}!</p>
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

  currentUser;
  galleryItems = signal<GalleryItem[]>([
    {id: 1, url: "image1.jpg" , comments: []},
    {id: 2, url: "image2.jpg" , comments: []},
    {id: 3, url: "image3.jpg" , comments: []},
    {id: 4, url: "image4.jpg" , comments: []},
    {id: 5, url: "image5.jpg" , comments: []},
    {id: 6, url: "image6.jpg" , comments: []},
    {id: 7, url: "image7.jpg" , comments: []},
    {id: 8, url: "image8.jpg" , comments: []},
    {id: 9, url: "image9.jpg" , comments: []},
    {id: 10, url: "image10.jpg", comments: []},
    
  ])
  
  constructor(private userService:UserService) {
    this.currentUser = userService.getUser()
  }
  
  onAddComment(event: Event, id:number){
    const input = event.target as HTMLInputElement
    const newComment = input.value
    this.galleryItems.update(items => {
      let selected = items.find(item => item.id === id)
      selected!.comments = [...selected!.comments, newComment]
      return items
    })
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

  onDelete(id: number){
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
      } else if (result.isDismissed) {
        Swal.fire('Operación cancelada', '', 'info')
      }
    })
  }
}
