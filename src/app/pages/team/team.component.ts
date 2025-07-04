import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { TeamCardComponent } from '../../components/team-card/team-card.component';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
   imports: [CommonModule,TeamCardComponent]
})
export class TeamComponent {
   currentIndex = 0;
  isAnimating = false;

  teamMembers = [
    {
      name: 'METAMORFO ',
      subtitle: 'Digital',
      role: 'Empresa',
      image: 'assets/assetsTeam/logoMeta.svg',
      text: 'Conoce al equipo detras de la empresa',
      socials: [
      { icon: 'fab fa-facebook', url: 'https://www.facebook.com/' },
      { icon: 'fab fa-whatsapp', url: 'https://wa.me/59175480182' },
      { icon: 'fab fa-instagram', url: 'https://instagram.com/' }
    ]
    },
    {
      name: 'Name2 ',
      role: 'Creative Director',
      image: 'https://https://via.placeholder.com/300x200/222/aaa?text=Imagen+Temporal.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=3870&auto=format&fit=crop',
      socials: [
      { icon: 'fab fa-twitter', url: 'https://twitter.com/' },
      { icon: 'fab fa-dribbble', url: 'https://dribbble.com/' },
      { icon: 'fab fa-facebook-f', url: 'https://facebook.com/' },
      { icon: 'fab fa-linkedin', url: 'https://linkedin.com/in/' },
      { icon: 'fab fa-github', url: 'https://github.com/' },
      { icon: 'fab fa-youtube', url: 'https://youtube.com/' } // esta no se muestra
    ]
      
    },
    {
      name: 'Name3',
      role: 'Lead Developer',
      image: 'https://images.https://via.placeholder.com/300x200/222/aaa?text=Imagen+Temporal.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop',
    },
    {
      name: 'Name4',
      role: 'UX Designer',
      image: 'https://images.unsplash.com/https://via.placeholder.com/300x200/222/aaa?text=Imagen+Temporal-1494790108377-be9c29b29330?w=900&auto=format&fit=crop',
    },
    {
      name: 'Name5',
      role: 'Marketing Manager',
      image: 'https://images.unsplash.com/photo-1655249481446-https://via.placeholder.com/300x200/222/aaa?text=Imagen+Temporal?w=900&auto=format&fit=crop',
    },
    {
      name: 'Name6',
      role: 'Product Manager',
      image: 'https://images.unsplash.https://via.placeholder.com/300x200/222/aaa?text=Imagen+Temporal/photo-1519085360753-af0119f7cbe7?q=80&w=3687&auto=format&fit=crop',
    }
  ];

  updateCarousel(index: number) {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const total = this.teamMembers.length;
    this.currentIndex = (index + total) % total;

    setTimeout(() => {
      this.isAnimating = false;
    }, 800);
  }

  getCardClass(i: number): string {
    const total = this.teamMembers.length;
    const offset = (i - this.currentIndex + total) % total;

    switch (offset) {
      case 0:
        return 'card center';
      case 1:
        return 'card right-1';
      case 2:
        return 'card right-2';
      case total - 1:
        return 'card left-1';
      case total - 2:
        return 'card left-2';
      default:
        return 'card hidden';
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.updateCarousel(this.currentIndex - 1);
    } else if (event.key === 'ArrowRight') {
      this.updateCarousel(this.currentIndex + 1);
    }
  }

  touchStartX = 0;

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0].screenX;
    const diff = this.touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        this.updateCarousel(this.currentIndex + 1);
      } else {
        this.updateCarousel(this.currentIndex - 1);
      }
    }
  }
}
