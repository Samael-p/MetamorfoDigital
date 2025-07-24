import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServiceComponent } from './pages/service/service.component';
import { TeamComponent } from './pages/team/team.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { ContactComponent } from './pages/contact/contact.component';
import { EliminacionDatosComponent } from './pages/eliminacion-datos/eliminacion-datos.component';
import { PoliticaDePrivacidadComponent } from './pages/politica-de-privacidad/politica-de-privacidad.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminComponent } from './admin/admin/admin.component';
import { authGuard } from './guards/auth.guard'; // el guard que creamos
import { AdminEquipoComponent } from './admin/admin-equipo/admin-equipo.component';


export const routes: Routes = [

  { path: 'admin', component: AdminComponent, canActivate: [authGuard]},
  { path: 'admin/login', component: LoginComponent },
  
  {
    path: 'eliminacion-datos',
    component: EliminacionDatosComponent
  },
  {
    path: 'politica-de-privacidad',
    component: PoliticaDePrivacidadComponent
  },
   { path: 'admin-equipo', 
    component: AdminEquipoComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
