import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Canvas } from './canvas';

describe('Canvas', () => {
  let component: Canvas;
  let fixture: ComponentFixture<Canvas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Canvas],
    }).compileComponents();

    fixture = TestBed.createComponent(Canvas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate through every gallery image in a loop', () => {
    component.anterior();
    expect(component.indiceActual).toBe(component.imagenes.length - 1);
    component.siguiente();
    expect(component.indiceActual).toBe(0);
    component.irA(2);
    expect(component.indiceActual).toBe(2);
  });
});
