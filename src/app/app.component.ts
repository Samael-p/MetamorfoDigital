import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Importaciones de tus componentes standalone
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ServiceComponent } from './pages/service/service.component';
import { TeamComponent } from './pages/team/team.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FooterComponent,
    HomeComponent,
    ServiceComponent,
    TeamComponent,
    ContactComponent,
    ProyectosComponent,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Metamorfo-web';
}
