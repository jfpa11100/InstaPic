import { Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import {
  LogInResponse,
  SignUpResponse,
} from '../interfaces/login-response.interface';
import { GalleryItem } from '../../features/interfaces/gallery-item.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, switchMap, tap, throwError } from 'rxjs';
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
    }

    return this.http
      .post<UserLoginResponse>('http://localhost:3000/api/user/login', body)
      .pipe(
        tap(data => {
          sessionStorage.setItem('token', data.token);
          this.setUser({
            name: data.name,
            photo: data.photo,
            username: data.username,
            email: data.email,
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
    return this.http
      .post<UserLoginResponse>('http://localhost:3000/api/user', user)
      .pipe(
        tap(data => {
          sessionStorage.setItem('token', data.token);
          this.setUser({
            name: data.name,
            photo: data.photo,
            username: data.username,
            email: data.email,
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

  getGallery(): Observable<GalleryItem[]> {
    return this.http.get<GalleryItem[]>('http://localhost:3000/api/posts', this.getHeaders());
  }

  saveImage(id:string, url: string) {
    return this.http
      .post('http://localhost:3000/api/posts', {id, url}, this.getHeaders())
      .pipe(tap( response => console.log(response) ))
      .subscribe();
  }

  updateUser(updateUser: User){
    this.currentUser.set({ ...this.currentUser(), ...updateUser})
    return this.http
      .patch('http://localhost:3000/api/user', this.currentUser(), this.getHeaders())
      .pipe(tap( response => console.log(response) ))
      .subscribe();
  }

  deletePost(postId: string): Observable<GalleryItem[]> {
    return this.http.delete<GalleryItem[]>(`http://localhost:3000/api/posts/${postId}`, this.getHeaders()).pipe(
      switchMap(() => this.getGallery())
    )
  }

  addComment(postId:string, comment:string):Observable<GalleryItem[]>{
    const body = {
      postId, comment
    }
    return this.http.post<GalleryItem[]>('http://localhost:3000/api/posts/comment', body, this.getHeaders()).pipe(
      switchMap(() => this.getGallery())
    )
  }

  getProfile(username: string) {
    localStorage.getItem(`profile-${username}`);
  }

  private getHeaders(){
    const token = sessionStorage.getItem('token') || '';

    return {
      headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
      })
    }
  }
}
