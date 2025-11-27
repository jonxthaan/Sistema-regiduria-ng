import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/convocatorias';

  // Obtener convocatorias activas
  getConvocatorias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear una nueva convocatoria (con archivo opcional)
  crearConvocatoria(datos: FormData): Observable<any> {
    return this.http.post(this.apiUrl, datos);
  }
}