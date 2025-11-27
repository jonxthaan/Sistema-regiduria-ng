import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EscuelaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/usuarios';

  // Obtener lista completa
  getEscuelas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear nueva escuela
  crearEscuela(escuela: any): Observable<any> {
    return this.http.post(this.apiUrl, escuela);
  }

  // ACTUALIZAR escuela (Nuevo)
  editarEscuela(id: number, escuela: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, escuela);
  }

  // Eliminar escuela
  eliminarEscuela(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}