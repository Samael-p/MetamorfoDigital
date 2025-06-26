import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
   imports: [CommonModule]
})
export class TeamComponent {
   currentIndex = 0;
  isAnimating = false;

  teamMembers = [
    {
      name: 'Emily Kim',
      role: 'Founder',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=3687&auto=format&fit=crop'
    },
    {
      name: 'Michael Steward',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=3870&auto=format&fit=crop'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop'
    },
    {
      name: 'Julia Gimmel',
      role: 'UX Designer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop'
    },
    {
      name: 'Lisa Anderson',
      role: 'Marketing Manager',
      image: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=900&auto=format&fit=crop'
    },
    {
      name: 'James Wilson',
      role: 'Product Manager',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=3687&auto=format&fit=crop'
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
