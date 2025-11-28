package com.regiduria.app.controller;

import com.regiduria.app.model.Usuario;
import com.regiduria.app.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*") // Permite peticiones desde cualquier frontend
@Tag(name = "Gestión de Usuarios (Escuelas)", description = "Módulo para administrar el registro de escuelas, directores y sus datos de contacto (CCT, teléfono, etc.)")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // 1. OBTENER TODOS LOS USUARIOS
    @Operation(summary = "Listar todos los usuarios", description = "Devuelve la lista completa de escuelas y directores registrados en el sistema.")
    @ApiResponse(responseCode = "200", description = "Lista recuperada exitosamente")
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    // 2. OBTENER UN USUARIO POR ID
    @Operation(summary = "Buscar usuario por ID", description = "Obtiene los detalles de una escuela específica mediante su identificador único.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuario encontrado"),
        @ApiResponse(responseCode = "404", description = "No se encontró ningún usuario con ese ID")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuario(@Parameter(description = "ID del usuario a buscar") @PathVariable Integer id) {
        return usuarioRepository.findById(id)
                .map(usuario -> ResponseEntity.ok().body(usuario))
                .orElse(ResponseEntity.notFound().build());
    }

    // 3. CREAR UN USUARIO NUEVO
    @Operation(summary = "Registrar nuevo usuario", description = "Da de alta una nueva escuela/director en la base de datos.")
    @ApiResponse(responseCode = "200", description = "Usuario registrado correctamente")
    @PostMapping
    public Usuario guardarUsuario(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // 4. ACTUALIZAR USUARIO
    @Operation(summary = "Actualizar información de usuario", description = "Modifica los datos de una escuela existente (Nombre Director, CCT, etc).")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Datos actualizados correctamente"),
        @ApiResponse(responseCode = "404", description = "El usuario a actualizar no existe")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(
            @Parameter(description = "ID del usuario a modificar") @PathVariable Integer id, 
            @RequestBody Usuario datosActualizados) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuario.setNombreEscuela(datosActualizados.getNombreEscuela());
                    usuario.setNombreDirector(datosActualizados.getNombreDirector());
                    usuario.setCctUsuario(datosActualizados.getCctUsuario());
                    // Actualiza el resto de campos necesarios...
                    Usuario actualizado = usuarioRepository.save(usuario);
                    return ResponseEntity.ok().body(actualizado);
                }).orElse(ResponseEntity.notFound().build());
    }

    // 5. ELIMINAR USUARIO
    @Operation(summary = "Eliminar usuario", description = "Borra permanentemente una escuela del sistema. ¡Usar con precaución!")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuario eliminado correctamente"),
        @ApiResponse(responseCode = "404", description = "No se encontró el usuario para eliminar")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> eliminarUsuario(@Parameter(description = "ID del usuario a eliminar") @PathVariable Integer id) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuarioRepository.delete(usuario);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}