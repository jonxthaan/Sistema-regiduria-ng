package com.regiduria.app.controller;

import com.regiduria.app.model.Aviso;
import com.regiduria.app.repository.AvisoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/avisos")
@CrossOrigin(origins = "*")
@Tag(name = "Avisos y Noticias", description = "Controlador para publicar y consultar avisos importantes en el sistema")
public class AvisoController {

    @Autowired
    private AvisoRepository avisoRepository;

    @Operation(summary = "Listar todos los avisos", description = "Obtiene la lista de avisos publicados para mostrar en el tablero principal.")
    @ApiResponse(responseCode = "200", description = "Lista de avisos recuperada correctamente")
    @GetMapping
    public List<Aviso> listarAvisos() {
        return avisoRepository.findAll();
    }

    @Operation(summary = "Publicar un nuevo aviso", description = "Crea un aviso nuevo que será visible para los usuarios.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Aviso publicado exitosamente"),
        @ApiResponse(responseCode = "400", description = "Error al intentar guardar el aviso")
    })
    @PostMapping
    public Aviso crearAviso(@RequestBody Aviso aviso) {
        return avisoRepository.save(aviso);
    }
}
