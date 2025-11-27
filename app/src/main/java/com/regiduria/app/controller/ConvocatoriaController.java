package com.regiduria.app.controller;

import com.regiduria.app.model.Convocatoria;
import com.regiduria.app.repository.ConvocatoriaRepository;
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
@RequestMapping("/api/convocatorias")
@CrossOrigin(origins = "*")
@Tag(name = "Gestión de Convocatorias", description = "Módulo para administrar las convocatorias (creación, listado y cambio de estatus)")
public class ConvocatoriaController {

    @Autowired
    private ConvocatoriaRepository convocatoriaRepository;

    @Operation(summary = "Listar todas las convocatorias", description = "Devuelve el historial completo de convocatorias registradas en el sistema.")
    @ApiResponse(responseCode = "200", description = "Lista obtenida correctamente")
    @GetMapping
    public List<Convocatoria> listarConvocatorias() {
        return convocatoriaRepository.findAll();
    }

    @Operation(summary = "Buscar convocatoria por ID", description = "Obtiene los detalles de una convocatoria específica mediante su identificador.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Convocatoria encontrada"),
        @ApiResponse(responseCode = "404", description = "Convocatoria no encontrada con ese ID")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Convocatoria> obtenerConvocatoria(@Parameter(description = "ID de la convocatoria a buscar") @PathVariable Integer id) {
        return convocatoriaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Registrar nueva convocatoria", description = "Crea una nueva convocatoria con estado inicial.")
    @ApiResponse(responseCode = "200", description = "Convocatoria creada exitosamente")
    @PostMapping
    public Convocatoria crearConvocatoria(@RequestBody Convocatoria convocatoria) {
        return convocatoriaRepository.save(convocatoria);
    }

    // Endpoint para cambiar el estado (ej. de 'activa' a 'cerrada')
    @Operation(summary = "Cambiar estado de convocatoria", description = "Actualiza el estatus de una convocatoria (ej. ACTIVA, CERRADA, FINALIZADA).")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Estado actualizado correctamente"),
        @ApiResponse(responseCode = "404", description = "No se encontró la convocatoria para actualizar")
    })
    @PutMapping("/{id}/estado")
    public ResponseEntity<Convocatoria> cambiarEstado(
            @Parameter(description = "ID de la convocatoria") @PathVariable Integer id, 
            @Parameter(description = "Nuevo estado a asignar") @RequestParam Convocatoria.Estado nuevoEstado) {
        return convocatoriaRepository.findById(id)
            .map(convocatoria -> {
                convocatoria.setEstado(nuevoEstado);
                return ResponseEntity.ok(convocatoriaRepository.save(convocatoria));
            })
            .orElse(ResponseEntity.notFound().build());
    }
}