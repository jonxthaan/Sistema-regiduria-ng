import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/convocatorias';

  getConvocatorias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // CAMBIO: Recibe 'any' (objeto simple) en vez de FormData
  crearConvocatoria(datos: any): Observable<any> {
    return this.http.post(this.apiUrl, datos);
  }
}