import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventario } from '../models/inventario.model';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/inventario';

   obtenerInventario(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Inventario> {
    return this.http.get<Inventario>(
      `${this.apiUrl}/${id}`
    );
  }

  crear(item: Inventario): Observable<Inventario> {
    return this.http.post<Inventario>(
      this.apiUrl,
      item
    );
  }

  actualizar(
    id: number,
    item: Inventario
  ): Observable<Inventario> {

    return this.http.put<Inventario>(
      `${this.apiUrl}/${id}`,
      item
    );
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }

}
