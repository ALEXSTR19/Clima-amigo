import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header/header';
import { Canvas } from './components/canvas/canvas';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Canvas],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Climate');
}
