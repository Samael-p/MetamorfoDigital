import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent {
 
  activeMember: any = null;

  team = [
    
    {
      name: 'Bolt Sotek',
      role: 'Desarrollador Frontend',
      description: 'Especialista en Angular, diseño moderno y efectos visuales.',
      image: 'assets/team/bolt.jpg',
      socials: [
        { icon: 'fab fa-twitter', link: 'https://twitter.com/bolt' },
        { icon: 'fab fa-facebook-f', link: 'https://facebook.com/bolt' },
        { icon: 'fab fa-instagram', link: 'https://instagram.com/bolt' }
      ]
    },
    {
      name: 'Marnie',
      role: 'UX/UI Designer',
      description: 'Diseñadora enfocada en experiencias limpias y atractivas.',
      image: 'assets/assetsTeam/astronaut.png',
      socials: [
        { icon: 'fab fa-behance', link: 'https://behance.net/marnie' },
        { icon: 'fab fa-whatsapp', link: 'https://whatsapp.com/marnie' }
      ]
    },
    {
      name: 'Heun Heal',
      role: 'Fullstack Dev',
      description: 'Conector entre frontend y backend con buenas prácticas.',
      image: 'assets/team/heun.jpg',
      socials: [
        { icon: 'fab fa-github', link: 'https://github.com/heun' },
        { icon: 'fab fa-linkedin-in', link: 'https://linkedin.com/in/heun' }
      ]
    },
    {
      name: 'YHI Melo',
      role: 'Backend Specialist',
      description: 'Arquitecto de bases de datos y microservicios.',
      image: 'assets/team/yhi.jpg',
      socials: [
        { icon: 'fab fa-linkedin', link: 'https://linkedin.com/in/yhi' }
      ]
    },
    {
      name: 'Romelo Blue',
      role: 'Analista QA',
      description: 'Control de calidad automatizado y pruebas funcionales.',
      image: 'assets/team/romelo.jpg',
      socials: [
        { icon: 'fab fa-twitter', link: 'https://twitter.com/romelo' }
      ]
    },
    {
      name: 'Ueie',
      role: 'Growth Hacker',
      description: 'Especialista en escalar productos digitalmente.',
      image: 'assets/team/ueie.jpg',
      socials: [
        { icon: 'fab fa-facebook', link: 'https://facebook.com/ueie' },
        { icon: 'fab fa-instagram', link: 'https://instagram.com/ueie' }
      ]
    },
  ];
 get isCardActive() {
    return !!this.activeMember;
  }

  activateCard(member: any, event: MouseEvent) {
    event.stopPropagation(); // evita cerrar al hacer clic dentro de la tarjeta
    this.activeMember = member;
    document.body.classList.add('no-scroll');
  }

  deactivateCard() {
    this.activeMember = null;
    document.body.classList.remove('no-scroll');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.activeMember) {
      this.deactivateCard();
    }
  }
}
