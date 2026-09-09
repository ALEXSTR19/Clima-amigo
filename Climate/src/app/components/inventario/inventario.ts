import { Component, inject, OnInit } from '@angular/core';
import { InventarioService } from '../../services/InventarioService';
import { Inventario as InventarioModel } from '../../models/inventario.model';
import { ReactiveFormsModule } from '@angular/forms';
import { InvRegis } from '../inv-regis/inv-regis';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-inventario',
  imports: [ReactiveFormsModule,RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css',
})
export class Inventario implements OnInit {

  private inventarioService = inject(InventarioService);

  inventario: InventarioModel[] = [];

  ngOnInit(): void {
    this.cargarInventario();
  }

  cargarInventario(): void {

    this.inventarioService.obtenerInventario()
      .subscribe({

        next: (datos) => {
          this.inventario = datos;

          console.log(
            'Inventario recibido:',
            datos
          );
        },

        error: (error) => {
          console.error(
            'Error al obtener inventario:',
            error
          );
        }

      });
  }
  }
