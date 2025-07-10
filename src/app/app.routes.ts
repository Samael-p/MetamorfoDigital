import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServiceComponent } from './pages/service/service.component';
import { TeamComponent } from './pages/team/team.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { ContactComponent } from './pages/contact/contact.component';


import { LoginComponent } from './admin/login/login.component';
import { AdminComponent } from './admin/admin/admin.component';
import { authGuard } from './guards/auth.guard'; // el guard que creamos



export const routes: Routes = [

  { path: 'admin', component: AdminComponent, canActivate: [authGuard]},
  { path: 'admin/login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
  
];
