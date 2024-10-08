import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { LogInResponse, SignUpResponse } from '../interfaces/login-response.interface';
import { GalleryItem } from '../../features/interfaces/gallery-item.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs'
import { UserLoginResponse } from '../interfaces/user-login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient){}

  currentUser = signal<User>({name: '', username: ''});

  logIn(username:string, password:string): Observable<LogInResponse>{
    const body = {
      username,
      password
    }
    return this.http.post<UserLoginResponse>('http://localhost:3000/api/user/login', body).pipe(
      tap(data => {
        sessionStorage.setItem('token', data.token)
        this.setUser({ name: data.name, photo: data.photo, username: data.username })
      }),
      map(() => {
        return { success: true}
      }),
      catchError(eer => throwError(() => eer.error.message))
    );
  }

  logout(){
    localStorage.removeItem('loggedUser');
    this.currentUser.set({name:'', username:'', email:''});
  }

  register(user: User):Observable<SignUpResponse> {
    const body = user
    console.log(body)


    return this.http.post<UserLoginResponse>('http://localhost:3000/api/user', body).pipe(
      tap(data => {
        sessionStorage.setItem('token', data.token)
        this.setUser({ name: data.name, photo: data.photo, username: data.username })
      }),
      map(() => {
        return { success: true}
      }),
      catchError(eer => throwError(() => eer.error.message))
    )
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
    const body = {
      url: galleryItem.url,
      username: username
    }

    return this.http.post<GalleryItem>('http://localhost:3000/api/posts', body).pipe(
      tap(),
      map(data => {
        let gallery = this.getGallery(username)
        gallery.push(data)
        this.updateGalleryItem(gallery, username)
        return data
      }),
      catchError(eer => throwError(() => eer.error.message))
    )

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
