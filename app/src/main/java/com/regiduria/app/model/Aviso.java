package com.regiduria.app.model;

import io.swagger.v3.oas.annotations.media.Schema; // <--- Importante para la documentación
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "avisos")
@Schema(description = "Entidad que representa una noticia o anuncio importante para las escuelas")
public class Aviso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador único del aviso (autogenerado)", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Integer id;

    // Relación: Muchos avisos -> Una convocatoria
    @ManyToOne
    @JoinColumn(name = "convocatoria_id")
    @Schema(description = "Convocatoria asociada al aviso (opcional)")
    private Convocatoria convocatoria;

    @Column(nullable = false, columnDefinition = "TEXT")
    @Schema(description = "Cuerpo del mensaje a comunicar", example = "Se les informa que la entrega de documentos se pospone hasta el viernes 20 de noviembre.")
    private String mensaje;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_aviso")
    @Schema(description = "Prioridad o categoría del aviso", example = "urgente")
    private TipoAviso tipoAviso;

    @CreationTimestamp
    @Column(name = "fecha_publicacion", updatable = false)
    @Schema(description = "Fecha y hora automática de publicación", example = "2023-11-27T09:30:00", accessMode = Schema.AccessMode.READ_ONLY)
    private LocalDateTime fechaPublicacion;

    public enum TipoAviso {
        normal, urgente
    }
}