import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Para redirigir al finalizar
import { ParticipacionService } from '../../services/participacion';
import { ConvocatoriaService } from '../../services/convocatoria';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-registro-participacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-participacion.html',
  styleUrl: './registro-participacion.css',
})
export class RegistroParticipacion implements OnInit {
  private participacionService = inject(ParticipacionService);
  private convocatoriaService = inject(ConvocatoriaService);
  private authService = inject(AuthService);
  private router = inject(Router);

  listaConvocatorias: any[] = [];
  usuario: any = null;

  // Objeto para enviar al backend
  registro = {
    convocatoriaId: '',     // Lo selecciona del dropdown
    escuelaId: null,        // Lo tomamos del login
    cantidadAlumnos: null,  // Lo escribe el usuario
    comentarios: '',        // Opcional
    confirmarAsistencia: false
  };

  ngOnInit() {
    // 1. Obtener usuario logueado
    this.usuario = this.authService.getUsuarioActual();
    
    if (this.usuario) {
      this.registro.escuelaId = this.usuario.id; // Asignamos el ID de la escuela automáticamente
    }

    // 2. Cargar las convocatorias para llenar el 'Select'
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

  registrar() {
    if (!this.registro.convocatoriaId || !this.registro.cantidadAlumnos) {
      alert('Por favor complete los campos obligatorios');
      return;
    }

    // Preparar datos para el backend
    // Nota: Dependiendo de tu Java, puede que necesites enviar objetos completos {id: X} 
    // pero intentaremos primero con el formato simple de IDs.
    const datosEnvio = {
      convocatoria: { id: this.registro.convocatoriaId },
      usuario: { id: this.registro.escuelaId },
      cantidadAlumnos: this.registro.cantidadAlumnos,
      comentarios: this.registro.comentarios,
      asistenciaReal: 0 // Inicia en 0
    };

    console.log('Enviando registro:', datosEnvio);

    this.participacionService.registrar(datosEnvio).subscribe({
      next: () => {
        alert('¡Registro exitoso! Nos vemos en el evento.');
        this.router.navigate(['/inicio-escuela']); // Regresar al inicio
      },
      error: (e) => {
        console.error(e);
        alert('Error al registrar: Verifica que no te hayas registrado ya a este evento.');
      }
    });
  }
}