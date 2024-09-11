import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  template: `
    <div class="login-box">
        <h2>Registrarse</h2>
        <form [formGroup]="registerForm">
          <input type="text" formControlName="username" id="username" placeholder="Nombre de usuario"/>
          <input type="email" formControlName="email" id="email" placeholder="Email"/>
          <input type="pasword" formControlName="password" id="password" placeholder="Contraseña"/>
          <input type="password" formControlName="rePassword" id="re-password" placeholder="Confirmar contraseña"/>
        </form>
        <a (click)="onRegister()" class="primary">Registrarse</a>
        <a [routerLink]="['/login']" href="index.html" class="secondary">¿Ya tiene cuenta?</a>
    </div>
  `,
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  
  user: User = {
    username: '',
    password: ''  
  }
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router ){
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]],  
      rePassword: ['', [Validators.required]]  
    })    
  }

  onRegister():void{
    console.log('onRegister')
    let username = this.registerForm.value.username;
    let email = this.registerForm.value.email;
    let password = this.registerForm.value.password;
    let rePassword = this.registerForm.value.rePassword;

    if (!username || !password) {
      alert("Debe diligenciar los campos")
      return;
    }
    //Controlar ingreso al localStorage
  }
}
