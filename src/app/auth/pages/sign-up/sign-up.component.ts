import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  template: `
    <div class="login-box">
        <h2>Registrarse</h2>
        <form [formGroup]="registerForm">
          <input type="text" formControlName="name" id="name" placeholder="Nombre"/>
          <input type="text" formControlName="username" id="username" placeholder="Nombre de usuario"/>
          <input type="email" formControlName="email" id="email" placeholder="Email"/>
          <input type="password" formControlName="password" id="password" placeholder="Contraseña"/>
          <input type="password" formControlName="rePassword" id="re-password" placeholder="Confirmar contraseña"/>
        </form>
        <a (click)="onRegister()" class="primary">Registrarse</a>
        <a [routerLink]="['/login']" class="secondary">¿Ya tiene cuenta?</a>
    </div>
  `,
})
export class SignUpComponent {
  
  user: User = {
    username: '',
    name: ''
  }

  registerForm!: FormGroup;
  userService!: UserService;

  constructor(private fb: FormBuilder, private router: Router, private us: UserService){
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      username: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]],  
      rePassword: ['', [Validators.required]]  
    })

    this.userService = us
  }

  onRegister(){
    if(!this.registerForm.valid){
      Swal.fire({
        title: 'Mal registro :(',
        text: 'Digilencia los campos correctamente',
        icon: 'error',
      })
      return;
    }

    const name = this.registerForm.value.name;
    const username = this.registerForm.value.username;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const rePassword = this.registerForm.value.rePassword;

    if (password !== rePassword){
      Swal.fire({
        title: 'Las contraseñas :(',
        text: 'No coinciden',
        icon: 'error',
      })
      return
    }

    this.userService.register({name, username, email, password}).subscribe({
      next:() => {
        this.router.navigateByUrl('/home')
        Swal.fire({
          text: 'Registro exitoso',
          icon: 'success',
        })
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error,
          icon: 'error',
        })
      }
    })
  }
}
