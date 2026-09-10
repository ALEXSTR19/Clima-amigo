export interface Inventario {
  id?: number;
  nombre: string;
  codigo: string;
  descripcion?: string;
  marca: string;
  modelo: string;
  cantidad: number;
  stockMinimo: number;
  estado: string;
}
