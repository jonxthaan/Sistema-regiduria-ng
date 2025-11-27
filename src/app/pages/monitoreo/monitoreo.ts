import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParticipacionService } from '../../services/participacion';
import { ConvocatoriaService } from '../../services/convocatoria';

@Component({
  selector: 'app-monitoreo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './monitoreo.html',
  styleUrl: './monitoreo.css',
})
export class Monitoreo implements OnInit {
  private participacionService = inject(ParticipacionService);
  private convocatoriaService = inject(ConvocatoriaService);

  listaConvocatorias: any[] = [];
  listaAsistencia: any[] = [];
  
  // Guardamos el ID del evento seleccionado
  idConvocatoriaSeleccionada: number | null = null;

  ngOnInit() {
    this.cargarConvocatorias();
  }

  cargarConvocatorias() {
    this.convocatoriaService.getConvocatorias().subscribe({
      next: (data) => {
        this.listaConvocatorias = data;
      },
      error: (e) => console.error('Error al cargar eventos:', e)
    });
  }

  // Se ejecuta cuando cambias el select del HTML
  cargarListaAsistencia() {
    if (this.idConvocatoriaSeleccionada) {
      this.participacionService.obtenerListaAsistencia(this.idConvocatoriaSeleccionada).subscribe({
        next: (data) => {
          this.listaAsistencia = data;
          console.log('Asistencias cargadas:', data);
        },
        error: (e) => console.error('Error cargando lista:', e)
      });
    } else {
      this.listaAsistencia = [];
    }
  }

  // Check-in en vivo: Actualiza solo la asistencia de una escuela
  actualizarCheckIn(participacion: any) {
    if (!participacion.cantidadReal || participacion.cantidadReal < 0) {
      alert('Ingresa una cantidad válida');
      return;
    }

    this.participacionService.marcarAsistencia(participacion.id, participacion.cantidadReal).subscribe({
      next: () => alert(`Entrada registrada para: ${participacion.nombreEscuela}`),
      error: (e) => alert('Error al registrar entrada: ' + e.message)
    });
  }
  
  // Calcula el total de gente que ya llegó (Suma de la columna check-in)
  getTotalAsistenciaReal(): number {
    return this.listaAsistencia.reduce((acc, item) => acc + (item.cantidadReal || 0), 0);
  }
}