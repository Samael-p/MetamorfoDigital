import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-weapon-wheel',
  imports: [CommonModule],
  templateUrl: './weapon-wheel.component.html',
  styleUrl: './weapon-wheel.component.scss'
})
export class WeaponWheelComponent {
  servicios = [
    { nombre: 'Desarrollo web', imagen: 'assets/assetsService/webDev.png' },
    { nombre: '3D', imagen: 'assets/assetsService/3D.png' },
    { nombre: 'Branding', imagen: 'assets/assetsService/Branding.png' },
    { nombre: 'Automatización de procesos', imagen: 'assets/assetsService/Automatizacion.png' },
    { nombre: 'Producción multimedia', imagen: 'assets/assetsService/Producción Multimedia.png' },
    { nombre: 'Cursos y Talleres', imagen: 'assets/assetsService/Cursos y Talleres.png' },
    
  ];
   getAngle(index: number): number {
    return (360 / this.servicios.length) * index;
  }
  getAnimationDelay(index: number): string {
  const delay = index * 100; // 100ms entre cada sector
  return `${delay}ms`;
}

}