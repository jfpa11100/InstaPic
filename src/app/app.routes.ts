import { Routes } from '@angular/router';
import { LogInComponent } from './auth/pages/log-in/log-in.component';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { HomeComponent } from './features/pages/home/home.component';
import { NewPostComponent } from './features/pages/new-post/new-post.component';
import { ProfileComponent } from './features/pages/profile/profile.component';
import { SearchComponent } from './features/pages/search/search.component';

export const routes: Routes = [
    { path:'login', component: LogInComponent },
    { path:'sign-up', component: SignUpComponent },
    { path:'home', component: HomeComponent },
    { path:'home/:username', component: HomeComponent },
    { path:'new-post', component: NewPostComponent },
    { path:'profile', component: ProfileComponent },
    { path:'search', component: SearchComponent },
    { path:'', redirectTo: 'login', pathMatch: 'full'},
    { path:'**', redirectTo: 'login', pathMatch: 'full'},


];
