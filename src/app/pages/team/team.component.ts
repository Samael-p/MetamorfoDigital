import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { TeamCardComponent } from '../../components/team-card/team-card.component';
import { Observable } from 'rxjs';

interface TeamMember {
  id?: string;
  name: string;
  subtitle?: string;
  role: string;
  image?: string;
  text?: string;
  socials?: { icon: string; url: string }[];
}

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  imports: [CommonModule, TeamCardComponent]
})
export class TeamComponent implements OnInit {
  currentIndex = 0;
  isAnimating = false;

  defaultMember: TeamMember = {
    name: 'METAMORFO',
    role: 'Empresa',
    image: 'assets/assetsTeam/logoMeta.svg',
    text: 'Conoce al equipo detras de la empresa',
    socials: [
      { icon: 'fab fa-facebook', url: 'https://www.facebook.com/profile.php?id=61574596280990' },
      { icon: 'fab fa-whatsapp', url: 'https://wa.me/59175480182' },
      { icon: 'fab fa-instagram', url: 'https://instagram.com/' }
    ]
  };

  teamMembers: TeamMember[] = [];

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    const teamCollection = collection(this.firestore, 'teamMembers');
    collectionData(teamCollection, { idField: 'id' }).subscribe(data => {
      if (data.length > 0) {
        this.teamMembers = [this.defaultMember, ...data as TeamMember[]];
      } else {
        this.teamMembers = [this.defaultMember];
      }
    });
  }

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
