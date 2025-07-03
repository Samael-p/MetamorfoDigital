import { Component,Input , } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-card',
  imports: [CommonModule],
  templateUrl: './team-card.component.html',
  styleUrl: './team-card.component.scss'
})
export class TeamCardComponent {

   @Input() member: any;
  @Input() isOnline: boolean = true;

  get limitedSocials() {
  return this.member?.socials?.slice(0, 3) || [];
}
}
