import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { Mantenimientos } from './mantenimientos';

describe('Mantenimientos', () => {
  let component: Mantenimientos;
  let fixture: ComponentFixture<Mantenimientos>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mantenimientos],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Mantenimientos);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    http.expectOne('http://localhost:8080/api/mantenimientos').flush([]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('conserva el estado al editar y actualizar', () => {
    component.editar({
      id: 7,
      nombreCliente: 'Ana',
      direccion: 'Calle 1',
      descripcion: 'Limpieza',
      marca: 'Marca',
      modelo: 'Modelo',
      cantidad: 1,
      estado: 'EN_PROCESO',
    });

    expect(component.formulario.controls.estado.value).toBe('EN_PROCESO');
    component.guardar();

    const request = http.expectOne('http://localhost:8080/api/mantenimientos/7');
    expect(request.request.method).toBe('PUT');
    expect(request.request.body.estado).toBe('EN_PROCESO');
    request.flush({});
    http.expectOne('http://localhost:8080/api/mantenimientos').flush([]);
  });
});
