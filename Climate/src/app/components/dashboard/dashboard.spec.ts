import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { Dashboard } from './dashboard';

@Component({
  selector: 'test-content',
  template: 'Contenido',
})
class TestContent {}

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        provideRouter([
          {
            path: 'dashboard',
            component: Dashboard,
            children: [
              { path: 'principal', component: TestContent },
              { path: 'inventario', component: TestContent },
              { path: 'mantenimientos', component: TestContent },
            ],
          },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render menu content inside the dashboard outlet', async () => {
    const harness = await RouterTestingHarness.create('/dashboard/inventario');
    const routedContent = harness.fixture.nativeElement;

    expect(routedContent.querySelector('.content test-content')).toBeTruthy();
    expect(routedContent.querySelector('.nav-link--active')?.textContent).toContain('Inventario');
  });
});
