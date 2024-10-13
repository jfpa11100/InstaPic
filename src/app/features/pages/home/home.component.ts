import { Component, signal } from '@angular/core';
import { UserService } from '../../../auth/services/user.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { GalleryItem } from '../../interfaces/gallery-item.interface';
import { PostsComponent } from '../../components/posts/posts.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PostsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  followers:number = 20
  requests = 150
  profilePhoto = ''
  uploadedPosts = 2
  user;

  constructor(private userService: UserService) {
    this.user = this.userService.getUser();
  }


  
}
