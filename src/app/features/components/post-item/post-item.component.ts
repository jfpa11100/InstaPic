import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '../../interfaces/gallery-item.interface';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.css'
})
export class PostItemComponent {

  @Input() id!: string;
  @Input() url!: string;
  @Input() comments!: Comment[];
  
  @Output() addComment = new EventEmitter();
  @Output() deleteComment = new EventEmitter();
  @Output() viewComments = new EventEmitter();

  constructor(){}

  onAddComment(event: Event){
    this.addComment.emit(event)
  }

  onDelete() {
    this.deleteComment.emit()
  }

  onViewComments() {
    this.viewComments.emit()
  }

}
