import { Routes } from '@angular/router';
import { Login } from './components/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  {
    path: 'mantenimientos',
    loadComponent: () =>
      import('./components/mantenimientos/mantenimientos').then((m) => m.Mantenimientos),
  },

  {
    path: 'inicio',
    loadComponent: () => import('./components/inicio/inicio').then((i) => i.Inicio),
  },

  {
    path: 'principal',
    loadComponent: () => import('./components/principal/principal').then((p) => p.Principal),
  },

  {
    path: 'inventario',
    loadComponent: () => import('./components/inventario/inventario').then((i) => i.Inventario),
  },

  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard').then((d) => d.Dashboard),
    children: [
      { path: '', redirectTo: 'principal', pathMatch: 'full' },
      {
        path: 'principal',
        loadComponent: () => import('./components/principal/principal').then((p) => p.Principal),
      },
      {
        path: 'inventario',
        loadComponent: () => import('./components/inventario/inventario').then((i) => i.Inventario),
      },
      {
        path: 'mantenimientos',
        loadComponent: () =>
          import('./components/mantenimientos/mantenimientos').then((m) => m.Mantenimientos),
      },
      {
        path: 'Regisinv',
        loadComponent: () =>
          import('./components/inv-regis/inv-regis').then((i) => i.InvRegis),
      },
    ],
  },

  { path: 'login', component: Login },

  {
    path: 'registro',
    loadComponent: () => import('./components/register/register').then((r) => r.Register),
  },
];
