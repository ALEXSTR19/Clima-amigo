export type EstadoMantenimiento = 'PENDIENTE' | 'EN_PROCESO' | 'COMPLETADO' | 'CANCELADO';

export interface Mantenimiento {
  id?: number;
  nombreCliente: string;
  direccion: string;
  descripcion?: string;
  marca: string;
  modelo: string;
  cantidad: number;
  estado: EstadoMantenimiento;
}
