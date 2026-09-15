import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mantenimientos } from '../components/mantenimientos/mantenimientos';

@Injectable({
  providedIn: 'root',
})
export class MantenimientoService {
    private http = inject(HttpClient);
    
    private apiUrl = 'http://localhost:8080/api/mantenimientos';

    obtenerMantenimientos(): Observable<Mantenimientos[]> {
        return this.http.get<Mantenimientos[]>(this.apiUrl);
      }

    obtenerPorId(id: number): Observable<Mantenimientos> {
        return this.http.get<Mantenimientos>(
          `${this.apiUrl}/${id}`
        );
      }
    
      crear(item: Mantenimientos): Observable<Mantenimientos> {
        return this.http.post<Mantenimientos>(
          this.apiUrl,
          item
        );
      }
    
      actualizar(
        id: number,
        item: Mantenimientos
      ): Observable<Mantenimientos> {

        return this.http.put<Mantenimientos>(
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
