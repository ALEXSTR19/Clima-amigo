import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from "@angular/router";
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [RouterModule,ReactiveFormsModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  credentials = { username: '', password: '' };
  constructor(private authService: Auth, private router: Router) {}
  
  onLogin() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        alert('¡Bienvenido!');
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}
