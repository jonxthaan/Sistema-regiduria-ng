import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  // Usamos el endpoint que SÍ funciona
  private apiUrl = 'http://localhost:8080/api/usuarios';

  // Iniciar sesión (Estrategia: Traer todos y filtrar)
  login(credenciales: { cctUsuario: string, password: string }): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(usuarios => {
        // Buscamos si existe un usuario con ese CCT y esa contraseña
        const usuarioEncontrado = usuarios.find(u => 
          u.cctUsuario === credenciales.cctUsuario && u.password === credenciales.password
        );

        if (usuarioEncontrado) {
          // Si existe, lo guardamos y retornamos éxito
          localStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));
          return usuarioEncontrado;
        } else {
          // Si no, lanzamos un error para que el componente lo detecte
          throw new Error('Credenciales incorrectas');
        }
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