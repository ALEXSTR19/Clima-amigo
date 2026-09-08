    import { Routes } from '@angular/router';
    import { Router } from '@angular/router';
    import { Login } from './components/login/login';

    export const routes: Routes = [
        { path: '', redirectTo: 'inicio', pathMatch: 'full' },
        { path: 'mantenimientos', loadComponent: () => import('./components/mantenimientos/mantenimientos').then(m => m.Mantenimientos) },
        { path: 'inicio', loadComponent: () => import('./components/inicio/inicio').then(i => i.Inicio) },

        { path: 'login', component: Login },
        { path: 'registro', loadComponent: () => import('./components/register/register').then(r => r.Register) },
    { path: '**', redirectTo: '' }
    ];
