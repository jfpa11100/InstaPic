import { Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import {
  LogInResponse,
  SignUpResponse,
} from '../interfaces/login-response.interface';
import { GalleryItem } from '../../features/interfaces/gallery-item.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { UserLoginResponse } from '../interfaces/user-login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  currentUser = signal<User>({ name: '', username: '' });

  logIn(username: string, password: string): Observable<LogInResponse> {
    const body = {
      username,
      password,
    };
    return this.http
      .post<UserLoginResponse>('http://localhost:3000/api/user/login', body)
      .pipe(
        tap((data) => {
          sessionStorage.setItem('token', data.token);
          this.setUser({
            name: data.name,
            photo: data.photo,
            username: data.username,
          });
        }),
        map(() => {
          return { success: true };
        }),
        catchError((eer) => throwError(() => eer.error.message))
      );
  }

  logout() {
    localStorage.removeItem('userLogged');
    this.currentUser.set({ name: '', username: '', email: '' });
  }

  register(user: User): Observable<SignUpResponse> {
    const body = user;
    console.log(body);

    return this.http
      .post<UserLoginResponse>('http://localhost:3000/api/user', body)
      .pipe(
        tap((data) => {
          sessionStorage.setItem('token', data.token);
          this.setUser({
            name: data.name,
            photo: data.photo,
            username: data.username,
          });
        }),
        map(() => {
          return { success: true };
        }),
        catchError((eer) => throwError(() => eer.error.message))
      );
  }

  private setUser(user: User) {
    localStorage.setItem('userLogged', JSON.stringify(user));
    this.currentUser.set(user);
  }

  getUser():WritableSignal<User> {
    if (!this.currentUser().username) {
      if (typeof window !== 'undefined' && window.localStorage) {
        const userSrt = localStorage.getItem('userLogged');
        if (userSrt) {
          const user = JSON.parse(userSrt);
          this.currentUser.set(user);
        }
      }
    }
    return this.currentUser;
  }

  getGallery() {
    let headers: HttpHeaders | undefined 

    if (typeof window !== 'undefined' && window.sessionStorage){
      const token = sessionStorage.getItem('token') || '';
      headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    }
    
    return this.http.get<GalleryItem[]>('http://localhost:3000/api/posts/user/id', {headers});
  }

  saveGalleryItem(newImage: GalleryItem, username: string) {
    const token = sessionStorage.getItem('token') || '';
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .post('http://localhost:3000/api/posts', newImage, { headers })
      .pipe(tap( response => console.log(response) ))
      .subscribe( response => console.log(response) );

    let galleryStr = localStorage.getItem(`imgs-${this.currentUser().username}`);
    if (galleryStr) {
      let gallery = JSON.parse(galleryStr);
      gallery = [...gallery, newImage];
      localStorage.setItem(`imgs-${username}`, JSON.stringify(gallery));
    } else {
      localStorage.setItem(`imgs-${username}`, JSON.stringify([newImage]));
    }
  }

  updateUser(updateUser: User){
    const token = sessionStorage.getItem('token') || '';
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const userBeforeUpdate:User = this.currentUser()

    this.currentUser.set({ ...userBeforeUpdate, ...updateUser})

    this.http
      .patch('http://localhost:3000/api/user', updateUser, { headers })
      .pipe(tap( response => console.log(response) ))
      .subscribe( response => response );
  }

  deletePost(postId: string):Observable<GalleryItem[]> {
    const token = sessionStorage.getItem('token') || '';
    const headers:HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete<GalleryItem[]>(`http://localhost:3000/api/posts/${postId}`, {headers});
  }

  addComment(postId:string, comment:string):Observable<GalleryItem[]>{
    const token = sessionStorage.getItem('token') || '';
    const headers:HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const body = {
      postId, comment
    }
    return this.http.post<GalleryItem[]>('http://localhost:3000/api/posts/add/comment', body, {headers});
  }

  getProfile(username: string) {
    localStorage.getItem(`profile-${username}`);
  }
}
