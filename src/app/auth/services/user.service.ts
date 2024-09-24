import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { LogInResponse, SignUpResponse } from '../interfaces/login-response.interface';
import { GalleryItem } from '../../features/interfaces/gallery-item.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser = signal<User>({username: '', password: ''});

  logIn(username:string, password:string): LogInResponse{
    const userStr = localStorage.getItem(username.toLowerCase())
    if (!userStr){
      return {
        success: false,
        message:'Usuario no registrado'
      }
    }
    const user:User = JSON.parse(userStr);
    if (user.password !== password){
      return {
        success: false,
        message:'Usuario o contraseña incorrecta'
      }
    }
    this.setUser(user)
    return {
      success: true
    }
  }

  logout(){
    localStorage.removeItem('loggedUser');
    this.currentUser.set({username:'', password:'', email:''});
  }

  register(user: User): SignUpResponse{
    if (localStorage.getItem(user.username.trim().toLowerCase())){
      return {
        success: false,
        message:'El usuario ya está registrado'
      }
    }
    const userStr = JSON.stringify(user)
    localStorage.setItem(user.username.trim().toLowerCase(), userStr)
    this.setUser(user)
    return {
      success: true
    }
  }

  private setUser(user:User){
    localStorage.setItem('userLogged', JSON.stringify(user))
    this.currentUser.set(user)
  }

  getUser() {
    if (!this.currentUser().username){
      if (typeof window !== 'undefined' && window.localStorage) {
        const userSrt = localStorage.getItem('loggedUser');
        if (userSrt) {
          const user = JSON.parse(userSrt);
          this.currentUser.set(user);
        }
      }
    }
    return this.currentUser;
  }

  saveGalleryItem(galleryItem: GalleryItem, username:string){
    let gallery = this.getGallery(username)
    gallery = [...gallery, galleryItem]
    localStorage.setItem(`gallery-${username}`, JSON.stringify(gallery))
  }

  getGallery(username:string){
    let gallery:GalleryItem[] = [] 
    if (typeof window !== 'undefined' && window.localStorage) {
      let galleryStr = localStorage.getItem(`gallery-${username}`)
      if (galleryStr){
        gallery = JSON.parse(galleryStr) 
      }
    }
    return gallery
  }

  updateGalleryItem(gallery: GalleryItem[], username:string){
    localStorage.setItem(`gallery-${username}`, JSON.stringify(gallery))
  }

  saveProfile(username:string){
    // localStorage.setItem(`profile-${username}` )
  }

  getProfile(username:string){
    localStorage.getItem(`profile-${username}`)
  }
}
