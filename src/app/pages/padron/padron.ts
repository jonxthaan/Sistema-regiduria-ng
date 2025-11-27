import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EscuelaService } from '../../services/escuela';

@Component({
  selector: 'app-padron',
  imports: [CommonModule, FormsModule],
  templateUrl: './padron.html',
  styleUrl: './padron.css',
})
export class Padron {
  private escuelaService = inject(EscuelaService);
  listaEscuelas: any[] = [];

  nuevaEscuela = {
    cct: "",
    nombreEscuela: "",
    nivel: "Primaria",
    director: "",
    password: "123"
  }

  ngOnInit() {
    this.cargarEscuelas();
  }

  cargarEscuelas() {
    this.escuelaService.getEscuelas().subscribe({
      next: (data) => {
        this.listaEscuelas = data;
        console.log('Escuelas cargadas:', data);
      },
      error: (e) =>
        console.error('Error al cargar escuelas:', e)
    });
  }

  guardar() {
    this.escuelaService.crearEscuela(this.nuevaEscuela).subscribe({
      next: (data) => {
        alert('Escuela registrada con éxito');
        this.cargarEscuelas();
        this.limpiarFormulario();
        document.getElementById('closeModal')?.click();
      },
      error: (e) => alert('Error al guardar escuela: ' + e.message)
    });
  }

  limpiarFormulario() {
    this.nuevaEscuela = { cct: "", nombreEscuela: "", nivel: "Primaria", director: "", password: "123" };
  }
  }