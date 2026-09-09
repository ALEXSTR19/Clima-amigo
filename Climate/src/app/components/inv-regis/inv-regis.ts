import { Component, inject } from '@angular/core';
import { InventarioService } from '../../services/InventarioService';
import { Inventario } from '../../models/inventario.model';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-inv-regis',
  imports: [ReactiveFormsModule],
  templateUrl: './inv-regis.html',
  styleUrl: './inv-regis.css',
})
export class InvRegis {
  private inventarioService = inject(InventarioService);

  inventario: Inventario = {
    nombre: '',
    codigo: '',
    marca: '',
    modelo: '',
    cantidad: 0,
    id: 0,
    estado: ''
  };

  mensaje = '';
  error = '';

  registrar(): void {

    this.mensaje = '';
    this.error = '';

    this.inventarioService
      .crear(this.inventario)
      .subscribe({

        next: (respuesta) => {

          console.log(
            'Inventario registrado:',
            respuesta
          );

          this.mensaje =
            'Inventario registrado correctamente';

          this.limpiarFormulario();
        },

        error: (err) => {

          console.error(
            'Error registrando inventario:',
            err
          );

          this.error =
            'No se pudo registrar el inventario';
        }

      });
  }


  limpiarFormulario(): void {

    this.inventario = {
      nombre: '',
      codigo: '',
      marca: '',
      modelo: '',
      cantidad: 0,
      id: 0,
      estado: ''
    };
  }
}
