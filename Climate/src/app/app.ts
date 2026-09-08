import { Component, signal } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header/header';
import { Canvas } from './components/canvas/canvas';
import { Inicio } from './components/inicio/inicio';
@Component({
  selector: 'app-root', 
  imports: [RouterOutlet, Header, Canvas, RouterModule, RouterLink, Inicio],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Climate');
}
