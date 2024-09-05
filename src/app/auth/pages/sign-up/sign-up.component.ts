import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="login-box">
        <h2>Registrarse</h2>
        <input type="text" id="username" placeholder="Nombre de usuario"/>
        <input type="email" id="email" placeholder="Email"/>
        <input type="pasword" id="password" placeholder="Contraseña"/>
        <input type="password" id="re-password" placeholder="Confirmar contraseña"/>
        <a [routerLink]="['/home']" class="primary">Registrarse</a>
        <a [routerLink]="['/login']" href="index.html" class="secondary">¿Ya tiene cuenta?</a>
    </div>
  `,
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

}
