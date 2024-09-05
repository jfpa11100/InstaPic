import { Routes } from '@angular/router';
import { LogInComponent } from './auth/pages/log-in/log-in.component';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { HomeComponent } from './features/pages/home/home.component';

export const routes: Routes = [
    { path:'login', component: LogInComponent },
    { path:'sign-up', component: SignUpComponent },
    { path:'home', component: HomeComponent },
    { path:'', redirectTo: 'login', pathMatch: 'full'},
    { path:'**', redirectTo: 'login', pathMatch: 'full'},


];
