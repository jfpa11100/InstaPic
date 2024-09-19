import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { UserService } from '../../../auth/services/user.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [],
  template: `
    <section>
      <input type="file"/>
    </section>
  `,
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {

  user;
  userService: UserService;
  postService: PostsService;
  constructor(private ps: PostsService, private us: UserService){
    this.postService = ps;
    this.userService = us;
    this.user = this.userService.getUser();
  }

  onUpload(event:Event){
    const fileName = uuidv4()
    const input = event.target as HTMLInputElement;
    if (input.files!.length <= 0) return
    const file:File = input.files![0]
    this.postService.uploadFile(file, this.user().username, fileName)
  }
}
