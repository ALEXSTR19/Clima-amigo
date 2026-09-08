import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  user = {username: '', password: ''};

  constructor(private authService: Auth, private router: Router) {}

  onRegister() {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Error al registrar el usuario. Intenta nuevamente.');
      }
    });
  }
}
