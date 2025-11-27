package com.regiduria.app.controller;

import com.regiduria.app.model.NivelEducativo;
import com.regiduria.app.repository.NivelEducativoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/niveles")
@CrossOrigin(origins = "*")
@Tag(name = "Niveles Educativos", description = "Controlador para gestionar los niveles escolares (Preescolar, Primaria, Secundaria, etc.)")
public class NivelEducativoController {

    @Autowired
    private NivelEducativoRepository nivelEducativoRepository;

    // 1. OBTENER TODOS LOS NIVELES
    @Operation(summary = "Obtener todos los niveles", description = "Devuelve una lista completa de los niveles educativos disponibles para llenar listas desplegables.")
    @ApiResponse(responseCode = "200", description = "Lista de niveles obtenida exitosamente")
    @GetMapping
    public List<NivelEducativo> listarNiveles() {
        return nivelEducativoRepository.findAll();
    }

    // 2. CREAR UN NIVEL
    @Operation(summary = "Crear un nuevo nivel", description = "Permite registrar un nuevo nivel educativo en la base de datos (ej. Universidad).")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Nivel educativo creado con éxito"),
        @ApiResponse(responseCode = "400", description = "Error en los datos enviados")
    })
    @PostMapping
    public NivelEducativo crearNivel(@RequestBody NivelEducativo nivel) {
        return nivelEducativoRepository.save(nivel);
    }
}