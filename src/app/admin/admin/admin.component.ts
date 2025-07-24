import {  Component,ElementRef,ViewChild,AfterViewInit,Renderer2 } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, signOut } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  imports: [CommonModule,
    RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  constructor(private router: Router, private auth: Auth) {}

  adminBoxes = [
    {
      title: 'Gestión de Equipos',
      description: 'Administra las cuentas de los integrantes.',
      route: '/admin-equipo',
      color: 'blue'
    },
    {
      title: 'Configuración del Sistema',
      description: 'Ajusta las configuraciones globales de la aplicación.',
       route: '',
        image: '',
    },
    
    // Puedes añadir más aquí fácilmente:
    // {
    //   title: 'Nuevo Cuadro',
    //   description: 'Descripción del nuevo cuadro.',
    //   color: 'blue'
    // }
  ];

  handleBoxClick(box: any): void {
    console.log('Cuadro clickeado:', box.title);
    // Aquí puedes manejar navegación, acciones, etc.
  }
async logout() {
  try {
    await signOut(this.auth);
    this.router.navigate(['/']);  // O la ruta que uses para login
  } catch (error) {
    console.error('Error cerrando sesión:', error);
  }
}
}
