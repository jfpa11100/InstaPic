import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { LogInResponse, SignUpResponse } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  logIn(username:string, password:string): LogInResponse{
    const storedPassword = localStorage.getItem(username.toLowerCase())
    if (storedPassword !== password){
      return {
        success: false,
        message:'Usuario o contraseña incorrecta'
      }
    }
    return {
      success: true
    }
  }

  register(user: User): SignUpResponse{
    if (localStorage.getItem(user.username.trim().toLowerCase())){
      return {
        success: false,
        message:'El usuario ya está registrado'
      }
    }

    localStorage.setItem(user.username.trim().toLowerCase(), user.password)
    return {
      success: true
    }
  }


}
