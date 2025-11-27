import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule], // Necesario para directivas básicas si las usas
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  nombreUsuario: string = 'Usuario';
  rolUsuario: string = '';

  ngOnInit() {
    const usuario = this.authService.getUsuarioActual();
    if (usuario) {
      // Intentamos mostrar el nombre del director, si no el CCT, si no 'Usuario'
      this.nombreUsuario = usuario.nombreDirector || usuario.cctUsuario || 'Usuario';
      this.rolUsuario = usuario.rol || '';
    }
  }

  logout() {
    // Opcional: Preguntar antes de salir
    if(confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}