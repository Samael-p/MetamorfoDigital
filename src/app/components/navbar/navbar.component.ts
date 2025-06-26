import { Component, HostListener , Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  imports:[CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']

})
export class NavbarComponent {
   isSticky: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    this.isSticky = scrollY > 4; // puedes ajustar ese número
  }
}