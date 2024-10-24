import { Component, signal } from '@angular/core';
import { UserService } from '../../../auth/services/user.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { GalleryItem } from '../../interfaces/gallery-item.interface';
import { PostsComponent } from '../../components/posts/posts.component';
import { ActivatedRoute } from '@angular/router';

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
  uploadedPosts = 2

  user;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    this.user = this.userService.getUser();
    this.activatedRoute.paramMap.subscribe(params => {
      const user = params.get('username') || this.user().username;
      this.userService.findUser(user).subscribe(console.log)
    })
  }


  
}
