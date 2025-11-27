import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  private authService = inject(AuthService);
  rol: string = '';

  ngOnInit() {
    const usuario = this.authService.getUsuarioActual();
    this.rol = usuario ? usuario.rol : ''; // Asumiendo que el backend devuelve 'admin' o 'escuela'
  }
  
  esAdmin(): boolean {
    return this.rol === 'admin';
  }

  esEscuela(): boolean {
    return this.rol === 'escuela';
  }
}