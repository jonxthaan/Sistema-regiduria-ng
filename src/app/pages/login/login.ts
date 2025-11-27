import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Ajustado a cctUsuario
  credenciales = {
    cctUsuario: '', 
    password: ''
  };

  iniciarSesion() {
    this.authService.login(this.credenciales).subscribe({
      next: (data) => {
        console.log('Login exitoso:', data);
        this.router.navigate(['/']); // Redirige al Dashboard
      },
      error: (e) => {
        console.error(e);
        // Muestra un mensaje más claro si falla
        alert('Error: Verifica que el backend esté corriendo y las credenciales sean correctas.');
      }
    });
  }
}