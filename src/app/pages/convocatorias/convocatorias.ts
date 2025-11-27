import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConvocatoriaService } from '../../services/convocatoria';

@Component({
  selector: 'app-convocatorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './convocatorias.html',
  styleUrl: './convocatorias.css',
})
export class Convocatorias implements OnInit {
  private convocatoriaService = inject(ConvocatoriaService);
  
  listaConvocatorias: any[] = [];
  archivoSeleccionado: File | null = null;

  nuevaConvocatoria = {
    titulo: '', 
    descripcion: '',
    fechaEvento: '',
    horaReunion: '', // <--- AGREGADO: Campo obligatorio
    tipoEvento: 'Desfile'
  };

  ngOnInit() {
    this.cargarConvocatorias();
  }

  cargarConvocatorias() {
    this.convocatoriaService.getConvocatorias().subscribe({
      next: (data) => {
        this.listaConvocatorias = data;
      },
      error: (e) => console.error('Error al cargar:', e)
    });
  }

  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  crear() {
    // Validar que no vaya vacío para evitar errores tontos
    if (!this.nuevaConvocatoria.horaReunion) {
      alert('Por favor selecciona una hora de reunión');
      return;
    }

    const datosParaEnviar = {
      titulo: this.nuevaConvocatoria.titulo,
      descripcion: this.nuevaConvocatoria.descripcion,
      fechaEvento: this.nuevaConvocatoria.fechaEvento,
      horaReunion: this.nuevaConvocatoria.horaReunion, // <--- AGREGADO: Enviar al backend
      tipoEvento: this.nuevaConvocatoria.tipoEvento
    };

    this.convocatoriaService.crearConvocatoria(datosParaEnviar).subscribe({
      next: () => {
        alert('Convocatoria creada con éxito');
        this.cargarConvocatorias();
        this.limpiarFormulario();
      },
      error: (e) => {
        console.error(e);
        alert('Error al crear: ' + e.message);
      }
    });
  }

  limpiarFormulario() {
    this.nuevaConvocatoria = { 
      titulo: '', 
      descripcion: '', 
      fechaEvento: '',
      horaReunion: '', // <--- AGREGADO
      tipoEvento: 'Desfile'
    };
    this.archivoSeleccionado = null;
  }
}