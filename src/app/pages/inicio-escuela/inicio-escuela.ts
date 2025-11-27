import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ConvocatoriaService } from '../../services/convocatoria';

@Component({
  selector: 'app-inicio-escuela',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio-escuela.html',
  styleUrl: './inicio-escuela.css',
})
export class InicioEscuela implements OnInit {
  private authService = inject(AuthService);
  private convocatoriaService = inject(ConvocatoriaService);

  usuario: any = null;
  convocatorias: any[] = [];

  ngOnInit() {
    // 1. Obtener datos del director logueado
    this.usuario = this.authService.getUsuarioActual();

    // 2. Cargar eventos disponibles (para mostrar avisos)
    this.cargarAvisos();
  }

  cargarAvisos() {
    this.convocatoriaService.getConvocatorias().subscribe({
      next: (data) => {
        this.convocatorias = data;
      },
      error: (e) => console.error('Error al cargar noticias:', e)
    });
  }
}