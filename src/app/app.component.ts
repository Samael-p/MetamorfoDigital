import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';

// Importaciones de tus componentes standalone
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ServiceComponent } from './pages/service/service.component';
import { TeamComponent } from './pages/team/team.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { AdminComponent } from './admin/admin/admin.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    HomeComponent,
    ServiceComponent,
    TeamComponent,
    ContactComponent,
    ProyectosComponent,
    FooterComponent,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Metamorfo-web';
   constructor(public router: Router) {}

  isAdminPage(): boolean {
    return this.router.url.startsWith('/admin');
}
}