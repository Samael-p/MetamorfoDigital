import { Component,Input , } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  selector: 'app-team-card',
  imports: [CommonModule],
  templateUrl: './team-card.component.html',
  styleUrl: './team-card.component.scss'
})
export class TeamCardComponent {

   @Input() member!: TeamMember;
  @Input() isOnline: boolean = true;

  get limitedSocials() {
  return this.member?.socials?.slice(0, 3) || [];
}
}
