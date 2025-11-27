import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscuelaService } from '../../services/escuela';
import { ConvocatoriaService } from '../../services/convocatoria';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private escuelaService = inject(EscuelaService);
  private convocatoriaService = inject(ConvocatoriaService);

  totalEscuelas: number = 0;
  totalConvocatorias: number = 0;

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    // Obtener total de escuelas
    this.escuelaService.getEscuelas().subscribe({
      next: (data) => this.totalEscuelas = data.length,
      error: (e) => console.error(e)
    });

    // Obtener total de convocatorias
    this.convocatoriaService.getConvocatorias().subscribe({
      next: (data) => this.totalConvocatorias = data.length,
      error: (e) => console.error(e)
    });
  }
}