import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="login-box">
      <h2>Iniciar Sesión</h2>
      <input type="text" id="username" placeholder="Nombre de usuario"/>
      <input type="password" id="password" placeholder="Contraseña"/>
      <a [routerLink]="['/home']" class="primary">Ingresar</a>
      <a [routerLink]="['/sign-up']" href="sign-up.html" class="secondary">Registrarse</a>
  </div>
  `,
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

}
