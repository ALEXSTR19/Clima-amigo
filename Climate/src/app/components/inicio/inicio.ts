import { Component } from '@angular/core';
import { Header } from "../header/header/header";
import { Canvas } from "../canvas/canvas";

@Component({
  selector: 'app-inicio',
  imports: [Header, Canvas],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {}
