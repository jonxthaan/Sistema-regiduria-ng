import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipacionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/participaciones';

  // Registrar participación (Lo usa la Escuela)
  registrar(datos: any): Observable<any> {
    return this.http.post(this.apiUrl, datos);
  }

  // Obtener lista para monitoreo (Lo usa la Regiduría)
  obtenerListaAsistencia(idConvocatoria: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/convocatoria/${idConvocatoria}`);
  }

  // Actualizar asistencia real (Check-in en vivo)
  marcarAsistencia(idParticipacion: number, cantidadReal: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${idParticipacion}/asistencia`, { cantidad: cantidadReal });
  }
}