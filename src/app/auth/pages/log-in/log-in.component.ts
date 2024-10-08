import { Component, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  template: `
    <div class="login-box">
      <h2>Iniciar Sesión</h2>
      <form [formGroup]="loginForm">
        <input type="text" formControlName="username" id="username" placeholder="Nombre de usuario"/>
        <input type="password" formControlName="password" id="password" placeholder="Contraseña"/>
      </form>
      <a (click)="onLogin()" class="primary">Ingresar</a>
      <a [routerLink]="['/sign-up']" class="secondary">Registrarse</a>
    </div>
  `,
  styleUrl: './log-in.component.css'
})
export class LogInComponent{
  
  user: User = {
    username: '',
    password: ''  
  }
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router ){
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']  
    })    
  }

  onLogin():void{
    if(!this.loginForm.valid){
      Swal.fire({
        text: 'Digilencia los campos correctamente',
        icon: 'error',
      })
      return;
    }

    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;

    const storedPassword = localStorage.getItem(username.toLowerCase())

    if (storedPassword === null){
      alert("Usuario no registrado")
      return
    }
    else if (password === storedPassword){
      this.router.navigateByUrl('/home')  
    }
    else {
      alert("Contraseña incorrecta")
    }
  }
}
