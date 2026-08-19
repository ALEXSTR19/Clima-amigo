import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface GaleriaItem {
  src: string;
  alt: string;
  titulo: string;
  descripcion: string;
  etiqueta: string;
}

@Component({
  selector: 'app-canvas',
  imports: [CommonModule],
  templateUrl: './canvas.html',
  styleUrl: './canvas.css',
})
export class Canvas {
  readonly imagenes: GaleriaItem[] = [
    { src: 'img1.jpg', alt: 'Instalación sostenible integrada con la naturaleza', titulo: 'Espacios que respiran', descripcion: 'Diseñamos soluciones que conviven con su entorno y aprovechan mejor cada recurso.', etiqueta: 'Diseño sostenible' },
    { src: 'img2.jpg', alt: 'Equipo trabajando en una solución climática', titulo: 'Tecnología con propósito', descripcion: 'Innovación práctica para medir, cuidar y transformar nuestros espacios.', etiqueta: 'Innovación' },
    { src: 'img3.jpg', alt: 'Paisaje natural protegido y lleno de vegetación', titulo: 'Un futuro más verde', descripcion: 'Cada proyecto es una oportunidad para generar bienestar y reducir nuestro impacto.', etiqueta: 'Impacto positivo' },
  ];

  indiceActual = 0;

  anterior(): void {
    this.irA(this.indiceActual - 1);
  }

  siguiente(): void {
    this.irA(this.indiceActual + 1);
  }

  irA(indice: number): void {
    this.indiceActual = (indice + this.imagenes.length) % this.imagenes.length;
  }

  manejarTeclado(evento: KeyboardEvent): void {
    if (evento.key === 'ArrowLeft') {
      evento.preventDefault();
      this.anterior();
    }
    if (evento.key === 'ArrowRight') {
      evento.preventDefault();
      this.siguiente();
    }
  }
}
