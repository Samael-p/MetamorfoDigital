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
    { nombre: 'Desarrollo web', icono: '' },
    { nombre: '3D', icono: '' },
    { nombre: 'Branding', icono: '' },
    { nombre: 'Automatización de procesos', icono: '' },
    { nombre: 'Producción multimedia', icono: '' },
    { nombre: 'Cursos y Talleres', icono: '' },
    
  ];
   getAngle(index: number): number {
    return (360 / this.servicios.length) * index;
  }
  getAnimationDelay(index: number): string {
  const delay = index * 100; // 100ms entre cada sector
  return `${delay}ms`;
}

}