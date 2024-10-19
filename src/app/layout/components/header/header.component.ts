import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../auth/services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header>
      @if(user().username){
      <nav>
        <ul>
          <li>InstaPIC</li>
          <li><a [routerLink]="['/home']">Inicio</a></li>
          <li><a [routerLink]="['/profile']">Mi perfil</a></li>
          <li><a [routerLink]="['/search']">Buscar</a></li>
          <li><a [routerLink]="['/new-post']">Nueva publicación</a></li>
          <li><a (click)="logout()">Cerrar sesión</a></li>
        </ul>
      </nav>
      }@else{
        <h1>InstaPIC</h1>
      }
    </header>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  user;
  constructor(private router:Router, private userService:UserService){
    this.user = this.userService.getUser();
  }

  logout(){
    this.userService.logout();
    this.user = this.userService.getUser();
    this.router.navigateByUrl('');
  }

}