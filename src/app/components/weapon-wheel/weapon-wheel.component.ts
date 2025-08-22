import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Icon {
  src: string;
  text: string;
  url: string; // ruta interna
}

@Component({
  selector: 'app-weapon-wheel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './weapon-wheel.component.html',
  styleUrl: './weapon-wheel.component.scss'
})
export class WeaponWheelComponent implements OnInit, OnDestroy {
  private intervalId: any;     
  private startTimeout: any;   
  private pauseTimeout: any;   

  icons: Icon[] = [
    { src: "assets/assetsTeam/logoMeta.svg", 
      text: "Metamorfo Digital", url: "/politica-de-privacidad" },
    { src: "assets/assetsService/Branding.webp", text: "Branding", url: "/branding" },
    { src: "assets/assetsService/3D.webp", text: "Impreciones 3D", url: "/impresiones" },
    { src: "assets/assetsService/Automatizacion.webp", text: "Automatizacion", url: "/automatizacion" },
    { src: "assets/assetsService/Cursos-y-Talleres.webp", text: "Cursos y Talleres", url: "/cursos" },
    { src: "assets/assetsService/Producción-Multimedia.webp", text: "Producción Multimedia", url: "/multimedia" },
    { src: "assets/assetsService/webDev.webp", text: "Desarrollo Web", url: "/web" },
  ];

  currentIndex: number = 0;
  center: Icon = this.icons[0];

  centerAnim: string = 'fade-in';
  textAnim: string = 'text-fade-in';

  radius: number = 0; 

  ngOnInit() {
    this.setResponsiveRadius();
    this.updatePositions();
    window.addEventListener('resize', this.onResize);
    setTimeout(() => this.updatePositions(), 0);

    // Delay inicial antes de empezar el carrusel
    this.startTimeout = setTimeout(() => {
      this.startAutoNext();
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    clearTimeout(this.startTimeout);
    clearTimeout(this.pauseTimeout);
    window.removeEventListener('resize', this.onResize);
  }

  /** Selecciona la imagen que estará en el centro */
  setActive(index: number) {
    this.animateChange(index);

    clearTimeout(this.pauseTimeout);
    clearInterval(this.intervalId);

    // Mantener 5 segundos antes de continuar
    this.pauseTimeout = setTimeout(() => {
      this.startAutoNext();
    }, 5000);
  }

  startAutoNext() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 3000);
  }

  next() {
    const nextIndex = (this.currentIndex + 1) % this.icons.length;
    this.animateChange(nextIndex);
  }

  animateChange(index: number) {
    this.centerAnim = 'fade-out';
    this.textAnim = 'text-fade-out';

    setTimeout(() => {
      this.currentIndex = index;
      this.center = this.icons[index];
      this.centerAnim = 'fade-in';
      this.textAnim = 'text-fade-in';
      this.updatePositions();
    }, 500);
  }

  onResize = () => {
    this.setResponsiveRadius();
    this.updatePositions();
  }

  setResponsiveRadius() {
    const width = window.innerWidth;
    if (width < 500) this.radius = 100;
    else if (width < 900) this.radius = 140;
    else this.radius = 200;
  }

  updatePositions() {
  const orbitDiv = document.querySelector('.orbit') as HTMLElement;
  if (!orbitDiv) return;

  const orbitImgs = orbitDiv.querySelectorAll('img');
  const total = orbitImgs.length;
  const angleStep = (2 * Math.PI) / total;

  orbitImgs.forEach((img, i) => {
    const relativeIndex = (i - this.currentIndex + total) % total;
    const angle = relativeIndex * angleStep - Math.PI / 2;

    const x = this.radius * Math.cos(angle);
    const y = this.radius * Math.sin(angle);
    const deg = (angle * 180 / Math.PI) + 90;

    // Centrar la miniatura usando translate(-50%, -50%)
    (img as HTMLElement).style.transform = `translate(${x}px, ${y}px) translate(-50%, -120%) rotate(${deg}deg)`;
  });
}
}
