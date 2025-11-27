package com.regiduria.app.controller;

import com.regiduria.app.model.Participacion;
import com.regiduria.app.repository.ParticipacionRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/participaciones")
@CrossOrigin(origins = "*")
@Tag(name = "Inscripciones y Participaciones", description = "Gestiona la inscripción de las escuelas a las diferentes convocatorias")
public class ParticipacionController {

    @Autowired
    private ParticipacionRepository participacionRepository;

    @Operation(summary = "Listar todas las inscripciones", description = "Muestra una lista de todas las escuelas que se han registrado en alguna convocatoria.")
    @ApiResponse(responseCode = "200", description = "Lista obtenida correctamente")
    @GetMapping
    public List<Participacion> listarTodas() {
        return participacionRepository.findAll();
    }

    @Operation(summary = "Registrar nueva participación", description = "Inscribe a una escuela en una convocatoria. IMPORTANTE: El JSON debe incluir el objeto 'escuela' (o su ID) y 'convocatoria' (o su ID).")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Inscripción realizada con éxito"),
        @ApiResponse(responseCode = "400", description = "Error en los datos (ej. ID de escuela no existe)")
    })
    @PostMapping
    public Participacion registrarParticipacion(@RequestBody Participacion participacion) {
        // Aquí Spring Boot espera que en el JSON le envíes el ID de la escuela y de la convocatoria
        return participacionRepository.save(participacion);
    }
    
    // Aquí podrías agregar métodos para calificar asistencia, etc.
}