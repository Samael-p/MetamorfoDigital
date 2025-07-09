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
      { icon: 'fab fa-facebook', url: 'https://www.facebook.com/profile.php?id=61574596280990' },
      { icon: 'fab fa-whatsapp', url: 'https://wa.me/59175480182' },
      { icon: 'fab fa-instagram', url: 'https://instagram.com/' }
    ]
    },
    {
      name: 'Samuel Meneses ',
      role: 'Creative Dev',
      image: 'assets/assetsTeam/sam.jpeg',
      socials: [
      { icon: 'fab fa-twitter', url: 'https://twitter.com/' },
      { icon: 'fab fa-facebook-f', url: 'https://facebook.com/' },
      { icon: 'fab fa-linkedin', url: 'https://linkedin.com/in/' },
      { icon: 'fab fa-github', url: 'https://github.com/' },
      { icon: 'fab fa-youtube', url: 'https://youtube.com/' } 
    ]
      
    },
    {
      name: 'Name3',
      role: 'Lead Developer',
      image: '',
    },
    {
      name: 'Name4',
      role: 'UX Designer',
      image: '',
    },
    {
      name: 'Name5',
      role: 'Marketing Manager',
      image: '',
    },
    {
      name: 'Name6',
      role: 'Product Manager',
      image: '',
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
