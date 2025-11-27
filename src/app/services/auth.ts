import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/auth'; // URL de tu equipo

  // Iniciar sesión
  login(credenciales: {usuario: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credenciales).pipe(
      tap((respuesta: any) => {
        // Guardamos el usuario en el navegador para no perder la sesión
        localStorage.setItem('usuario', JSON.stringify(respuesta));
      })
    );
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('usuario');
  }

  // Obtener usuario actual
  getUsuarioActual() {
    const user = localStorage.getItem('usuario');
    return user ? JSON.parse(user) : null;
  }
}