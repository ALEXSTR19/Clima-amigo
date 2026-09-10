import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { InventarioService } from '../../services/InventarioService';
import { Inventario as InventarioModel } from '../../models/inventario.model';

@Component({
  selector: 'app-inventario',
  imports: [ReactiveFormsModule],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css',
})
export class Inventario implements OnInit {
  private readonly inventarioService = inject(InventarioService);
  private readonly formBuilder = inject(FormBuilder);

  inventario: InventarioModel[] = [];
  editandoId: number | null = null;
  mostrarFormulario = false;
  cargando = false;
  guardando = false;
  mensaje = '';
  error = '';

  readonly formulario = this.formBuilder.nonNullable.group({
    codigo: ['', [Validators.required, Validators.maxLength(50)]],
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    descripcion: ['', Validators.maxLength(255)],
    marca: ['', [Validators.required, Validators.maxLength(80)]],
    modelo: ['', [Validators.required, Validators.maxLength(80)]],
    cantidad: [0, [Validators.required, Validators.min(0)]],
    stockMinimo: [0, [Validators.required, Validators.min(0)]],
  });

  ngOnInit(): void {
    this.cargarInventario();
  }

  cargarInventario(): void {
    this.cargando = true;
    this.error = '';
    this.inventarioService
      .obtenerInventario()
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe({
        next: (datos) => (this.inventario = datos),
        error: () => (this.error = 'No se pudo cargar el inventario. Inténtalo nuevamente.'),
      });
  }

  nuevo(): void {
    this.editandoId = null;
    this.formulario.reset({ cantidad: 0, stockMinimo: 0 });
    this.mostrarFormulario = true;
    this.limpiarMensajes();
  }

  editar(item: InventarioModel): void {
    this.editandoId = item.id ?? null;
    this.formulario.reset({
      codigo: item.codigo,
      nombre: item.nombre,
      descripcion: item.descripcion ?? '',
      marca: item.marca,
      modelo: item.modelo,
      cantidad: item.cantidad,
      stockMinimo: item.stockMinimo ?? 0,
    });
    this.mostrarFormulario = true;
    this.limpiarMensajes();
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.editandoId = null;
    this.formulario.reset({ cantidad: 0, stockMinimo: 0 });
  }

  guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.guardando = true;
    this.limpiarMensajes();
    const item: InventarioModel = { ...this.formulario.getRawValue(), estado: '' };
    const operacion = this.editandoId === null
      ? this.inventarioService.crear(item)
      : this.inventarioService.actualizar(this.editandoId, item);

    operacion.pipe(finalize(() => (this.guardando = false))).subscribe({
      next: () => {
        this.mensaje = this.editandoId === null
          ? 'Equipo registrado correctamente.'
          : 'Equipo actualizado correctamente.';
        this.cancelar();
        this.cargarInventario();
      },
      error: () => (this.error = 'No se pudieron guardar los cambios. Revisa los datos.'),
    });
  }

  eliminar(item: InventarioModel): void {
    if (item.id == null || !confirm(`¿Deseas eliminar "${item.nombre}" del inventario?`)) {
      return;
    }

    this.limpiarMensajes();
    this.inventarioService.eliminar(item.id).subscribe({
      next: () => {
        this.inventario = this.inventario.filter((registro) => registro.id !== item.id);
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
