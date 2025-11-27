package com.regiduria.app.model;

import io.swagger.v3.oas.annotations.media.Schema; // <--- No olvides este import
import jakarta.persistence.*;
import lombok.Data; 

@Data
@Entity
@Table(name = "niveles_educativos")
@Schema(description = "Catálogo de niveles escolares (Preescolar, Primaria, etc.)")
public class NivelEducativo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador único del nivel", example = "2", accessMode = Schema.AccessMode.READ_ONLY)
    private Integer id;

    @Column(nullable = false, length = 50)
    @Schema(description = "Nombre del nivel educativo", example = "Secundaria")
    private String nombre;

    @Column(name = "orden_salida", nullable = false)
    @Schema(description = "Número que define en qué orden desfilan (1 = primero, 10 = último)", example = "3")
    private Integer ordenSalida;

    @Column(name = "color_mapa", nullable = false, length = 20)
    @Schema(description = "Código de color o clase CSS para representar este nivel en el mapa", example = "#FF5733")
    private String colorMapa;

    @Column(columnDefinition = "TEXT")
    @Schema(description = "Descripción adicional del nivel", example = "Incluye secundarias técnicas y generales")
    private String descripcion;
}