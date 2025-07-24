import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';


interface Pokemon {
  id: string;
  name: string;
  smallImage: string;
  largeImage: string;
  description: string;
}

@Component({
  selector: 'app-weapon-wheel',
  imports: [CommonModule],
  templateUrl: './weapon-wheel.component.html',
  styleUrl: './weapon-wheel.component.scss'
})
export class WeaponWheelComponent implements OnInit, OnDestroy {

  // Lista de Pokémon que se mostrarán en la galería
  pokemons: Pokemon[] = [
    {
      id: '1',
      name: 'METAmorfo',
      smallImage: 'assets/assetsTeam/logoMeta.svg',
      largeImage: 'assets/assetsTeam/logoMeta.svg',
      description: 'text here'
    },
    {
      id: '2',
      name: 'Desarrollo web',
      smallImage: 'assets/assetsService/webDev.png',
      largeImage: 'assets/assetsService/webDev.png',
      description: 'text here'
    },
    {
      id: '3',
      name: '3D',
     smallImage: 'assets/assetsService/3D.png',
      largeImage: 'assets/assetsService/3D.png',
      description: 'text here'
     },
    {
      id: '4',
      name: 'Branding',
     smallImage: 'assets/assetsService/Branding.png',
      largeImage: 'assets/assetsService/Branding.png',
      description: 'text here'
     },
    {
      id: '5',
      name: 'Automatización de procesos',
      smallImage: 'assets/assetsService/Automatizacion.png',
      largeImage: 'assets/assetsService/Automatizacion.png',
      description: 'text here'
     },
     {
      id: '6',
      name: 'Producción multimedia',
      smallImage: 'assets/assetsService/Producción Multimedia.png',
      largeImage: 'assets/assetsService/Producción Multimedia.png',
      description: 'text here'
     },
     {
      id: '7',
      name: 'Cursos y Talleres',
      smallImage: 'assets/assetsService/Cursos y Talleres.png',
      largeImage: 'assets/assetsService/Cursos y Talleres.png',
      description: 'text here'
     },
  ];//modificar en scss si se agrega otro item 
  // .cards:has(input#item-1:checked) 

  // ID del Pokémon actualmente seleccionado (el que está en el centro)
  selectedPokemonId: string = '';
  private intervalId: any; // Para almacenar el ID del intervalo de rotación

  constructor() { }

  ngOnInit(): void {
    // Establecer el primer Pokémon como seleccionado inicialmente al cargar la página
    if (this.pokemons.length > 0) {
      this.selectedPokemonId = this.pokemons[0].id;
    }
    this.startAutoRotate(); // Iniciar la rotación automática
  }

  ngOnDestroy(): void {
    // Limpiar el intervalo cuando el componente se destruye para evitar fugas de memoria
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Función para iniciar o reiniciar la rotación automática de los Pokémon
  startAutoRotate(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Limpiar cualquier intervalo existente
    }

    this.intervalId = setInterval(() => {
      const currentPokemonIndex = this.pokemons.findIndex(p => p.id === this.selectedPokemonId);
      const nextIndex = (currentPokemonIndex + 1) % this.pokemons.length;
      this.selectedPokemonId = this.pokemons[nextIndex].id;
    }, 5000); // Cambiar de Pokémon cada 3 segundos
  }
}