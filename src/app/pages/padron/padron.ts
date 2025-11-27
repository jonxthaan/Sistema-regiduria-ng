import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EscuelaService } from '../../services/escuela';

// Declaramos JQuery para cerrar el modal
declare var $: any;

@Component({
  selector: 'app-padron',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './padron.html',
  styleUrl: './padron.css',
})
export class Padron implements OnInit {
  private escuelaService = inject(EscuelaService);
  listaEscuelas: any[] = [];

  // Variables para control de edición
  esEdicion: boolean = false;
  idEscuelaSeleccionada: number | null = null;

  // Objeto del formulario
  nuevaEscuela = {
    cctUsuario: "",
    nombreEscuela: "",
    nivelId: 2, // Por defecto Primaria (ID 2)
    nombreDirector: "",
    password: "123",
    rol: "escuela"
  };

  ngOnInit() {
    this.cargarEscuelas();
  }

  cargarEscuelas() {
    this.escuelaService.getEscuelas().subscribe({
      next: (data) => {
        this.listaEscuelas = data;
        console.log('Datos cargados:', data);
      },
      error: (e) => console.error('Error al cargar:', e)
    });
  }

  // ABRIR PARA CREAR
  abrirModalCrear() {
    this.esEdicion = false;
    this.idEscuelaSeleccionada = null;
    this.limpiarFormulario();
  }

  // ABRIR PARA EDITAR
  cargarDatosEdicion(escuela: any) {
    this.esEdicion = true;
    this.idEscuelaSeleccionada = escuela.id;
    
    // Rellenamos el formulario.
    // IMPORTANTE: Extraemos el ID del objeto nivelEducativo si existe
    this.nuevaEscuela = {
      cctUsuario: escuela.cctUsuario,
      nombreEscuela: escuela.nombreEscuela,
      nivelId: escuela.nivelEducativo ? escuela.nivelEducativo.id : 2, 
      nombreDirector: escuela.nombreDirector,
      password: escuela.password || "", // Mantenemos la pass si viene, o vacía
      rol: escuela.rol
    };
  }

  guardar() {
    // CONSTRUIR EL OBJETO PARA EL BACKEND
    // Spring Boot espera una relación, así que enviamos el objeto anidado
    const payload = {
      cctUsuario: this.nuevaEscuela.cctUsuario,
      nombreEscuela: this.nuevaEscuela.nombreEscuela,
      nombreDirector: this.nuevaEscuela.nombreDirector,
      password: this.nuevaEscuela.password,
      rol: this.nuevaEscuela.rol,
      nivelEducativo: {
        id: this.nuevaEscuela.nivelId // Aquí va el ID numérico del select
      }
    };

    if (this.esEdicion && this.idEscuelaSeleccionada) {
      // --- ACTUALIZAR ---
      this.escuelaService.editarEscuela(this.idEscuelaSeleccionada, payload).subscribe({
        next: () => {
          alert('Escuela actualizada correctamente');
          this.cerrarModalYRecargar();
        },
        error: (e) => alert('Error al actualizar: ' + e.message)
      });

    } else {
      // --- CREAR ---
      this.escuelaService.crearEscuela(payload).subscribe({
        next: () => {
          alert('Escuela registrada con éxito');
          this.cerrarModalYRecargar();
        },
        error: (e) => alert('Error al guardar: ' + e.message)
      });
    }
  }

  eliminar(id: number) {
    if(confirm('¿Seguro que deseas eliminar esta escuela?')) {
      this.escuelaService.eliminarEscuela(id).subscribe({
        next: () => {
          alert('Eliminado correctamente');
          this.cargarEscuelas();
        },
        error: (e) => alert('Error al eliminar: ' + e.message)
      });
    }
  }

  limpiarFormulario() {
    this.nuevaEscuela = { 
      cctUsuario: "", 
      nombreEscuela: "", 
      nivelId: 2, 
      nombreDirector: "", 
      password: "123", 
      rol: "escuela" 
    };
  }

  cerrarModalYRecargar() {
    this.cargarEscuelas();
    this.limpiarFormulario();
    // Cierra el modal simulando clic en cancelar
    const btn = document.getElementById('cerrarModalBtn');
    if(btn) btn.click(); 
  }
}