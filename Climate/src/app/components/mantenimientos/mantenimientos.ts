import { Component, inject, OnInit } from '@angular/core';
import { MantenimientoService } from '../../services/mantenimiento-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Mantenimiento } from '../../models/mantenimiento.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-mantenimientos',
  imports: [ReactiveFormsModule],
  templateUrl: './mantenimientos.html',
  styleUrl: './mantenimientos.css',
})
export class Mantenimientos implements OnInit {
  private readonly mantenimientoService = inject(MantenimientoService);
  private readonly formBuilder = inject(FormBuilder);

  mantenimientos: Mantenimiento[] = [];
  editandoId: number | null = null;
  mostrarFormulario = false;
  cargando = false;
  guardando = false;
  mensaje = '';
  error = '';

  readonly formulario = this.formBuilder.nonNullable.group({
    direccion: ['', [Validators.required, Validators.maxLength(50)]],
    nombreCliente: ['', [Validators.required, Validators.maxLength(100)]],
    descripcion: ['', Validators.maxLength(255)],
    marca: ['', [Validators.required, Validators.maxLength(80)]],
    modelo: ['', [Validators.required, Validators.maxLength(80)]],
    cantidad: [0, [Validators.required, Validators.min(0)]],
  });

  ngOnInit(): void {
    this.cargarMantenimientos();
  }

  cargarMantenimientos(): void {
      this.cargando = true;
      this.error = '';
      this.mantenimientoService
        .obtenerMantenimientos()
        .pipe(finalize(() => (this.cargando = false)))
        .subscribe({
          next: (datos) => (this.mantenimientos = datos as unknown as Mantenimiento[]),
          error: () => (this.error = 'No se pudo cargar los mantenimientos. Inténtalo nuevamente.'),
        });
    }
    nuevo(): void {
        this.editandoId = null;
        this.formulario.reset({ cantidad: 0});
        this.mostrarFormulario = true;
        this.limpiarMensajes();
      }
    
      editar(item: Mantenimiento): void {
        this.editandoId = item.id ?? null;
        this.formulario.reset({
          direccion: item.direccion,
          nombreCliente: item.nombreCliente,
          descripcion: item.descripcion ?? '',
          marca: item.marca,
          modelo: item.modelo,
          cantidad: item.cantidad,
        });
        this.mostrarFormulario = true;
        this.limpiarMensajes();
      }
    
      cancelar(): void {
        this.mostrarFormulario = false;
        this.editandoId = null;
      }
    
      guardar(): void {
        if (this.formulario.invalid) {
          this.formulario.markAllAsTouched();
          return;
        }
    
        this.guardando = true;
        this.limpiarMensajes();
        const item = {
          ...this.formulario.getRawValue(),
          estado: '',
        } as unknown as Parameters<MantenimientoService['crear']>[0];
        const operacion = this.editandoId === null
          ? this.mantenimientoService.crear(item)
          : this.mantenimientoService.actualizar(this.editandoId, item);
    
        operacion.pipe(finalize(() => (this.guardando = false))).subscribe({
          next: () => {
            this.mensaje = this.editandoId === null
              ? 'Equipo registrado correctamente.'
              : 'Equipo actualizado correctamente.';
            this.cancelar();
            this.cargarMantenimientos();
          },
          error: () => (this.error = 'No se pudieron guardar los cambios. Revisa los datos.'),
        });
      }
    
      eliminar(item: Mantenimiento): void {
        if (item.id == null || !confirm(`¿Deseas eliminar "${item.nombreCliente}" del inventario?`)) {
          return;
        }
    
        this.limpiarMensajes();
        this.mantenimientoService.eliminar(item.id).subscribe({
          next: () => {
            this.mantenimientos = this.mantenimientos.filter((registro) => registro.id !== item.id);
            this.mensaje = 'Equipo eliminado correctamente.';
          },
          error: () => (this.error = 'No se pudo eliminar el equipo.'),
        });
      }
    
      campoInvalido(campo: keyof typeof this.formulario.controls): boolean {
        const control = this.formulario.controls[campo];
        return control.invalid && (control.dirty || control.touched);
      }
    
      private limpiarMensajes(): void {
        this.mensaje = '';
        this.error = '';
      }
}
