package com.regiduria.app.model;

import io.swagger.v3.oas.annotations.media.Schema; // <--- Importante
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Entity
@Table(name = "convocatorias")
@Schema(description = "Modelo que representa una convocatoria, evento o concurso organizado por la regiduría")
public class Convocatoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador único de la convocatoria", example = "15", accessMode = Schema.AccessMode.READ_ONLY)
    private Integer id;

    @Column(nullable = false, length = 150)
    @Schema(description = "Título principal del evento", example = "Desfile Cívico del 20 de Noviembre")
    private String titulo;

    @Column(name = "tipo_evento", nullable = false, length = 50)
    @Schema(description = "Categoría del evento", example = "Cívico")
    private String tipoEvento;

    @Column(name = "fecha_evento", nullable = false)
    @Schema(description = "Día en que se realizará el evento (Formato YYYY-MM-DD)", example = "2023-11-20", type = "string", format = "date")
    private LocalDate fechaEvento; 

    @Column(name = "hora_reunion", nullable = false)
    @Schema(description = "Hora de la cita o inicio (Formato HH:MM:SS)", example = "08:00:00", type = "string", format = "time")
    private LocalTime horaReunion; 

    @Column(columnDefinition = "TEXT")
    @Schema(description = "Detalles completos, requisitos o descripción del evento", example = "Se convoca a todas las escuelas primarias a participar con uniforme de gala...")
    private String descripcion;

    @Column(name = "archivo_pdf")
    @Schema(description = "Nombre o URL del archivo PDF con las bases (opcional)", example = "bases_desfile_2023.pdf")
    private String archivoPdf;

    @Enumerated(EnumType.STRING)
    @Schema(description = "Estado actual de la convocatoria", example = "activa")
    private Estado estado; 

    @CreationTimestamp
    @Column(name = "creado_en", updatable = false)
    @Schema(description = "Fecha de registro en el sistema", accessMode = Schema.AccessMode.READ_ONLY)
    private LocalDateTime creadoEn;

    // Enum para el estado de la convocatoria
    public enum Estado {
        activa, cerrada, finalizada
    }
}
