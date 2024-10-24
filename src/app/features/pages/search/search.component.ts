import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { User } from '../../../auth/interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../auth/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit  {
  users = signal<User[]>([]);

  userService = inject(UserService)
  router = inject(Router)


  ngOnInit(): void {
    this.userService.getUsers().subscribe(this.users.set)
  }

  onView(user: User) {
    this.router.navigateByUrl(`home/${user.username}`)
  }
}
