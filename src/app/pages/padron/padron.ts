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
    cctUsuario: "",
    nombreEscuela: "",
    nivelId: "1",
    nombreDirector: "",
    password: "123",
    rol: "escuela"
  }

  ngOnInit() {
    this.cargarEscuelas();
  }

  cargarEscuelas() {
    this.escuelaService.getEscuelas().subscribe({
      next: (data) => {
        this.listaEscuelas = data;
        console.log('Datos recibidos de Java:', data); // Revisa la consola del navegador
      },
      error: (e) => console.error('Error al cargar:', e)
    });
  }


  getNombreNivel(id: number): string {
    const mapa: any = { 1: 'Preescolar', 2: 'Primaria', 3: 'Secundaria', 4: 'Medio Superior', 5: 'Superior' };
    return mapa[id] || 'Desconocido';
  }

  guardar() {
    const niveles: any = { 'Preescolar': 1, 'Primaria': 2, 'Secundaria': 3, 'Medio Superior': 4, 'Superior': 5 };
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
    this.nuevaEscuela = { cctUsuario: "", nombreEscuela: "", nivelId: "Primaria", nombreDirector: "", password: "123", rol: "Escuela" };
  }
  }