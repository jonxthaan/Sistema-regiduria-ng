package com.regiduria.app.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "participaciones")
@Schema(description = "Registro de inscripción de una escuela a una convocatoria específica")
public class Participacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "ID único de la participación", example = "55", accessMode = Schema.AccessMode.READ_ONLY)
    private Integer id;

    // Relación con Convocatoria
    @ManyToOne
    @JoinColumn(name = "convocatoria_id", nullable = false)
    @Schema(description = "La convocatoria o evento al que se inscriben")
    private Convocatoria convocatoria;

    // Relación con Usuario (Escuela)
    @ManyToOne
    @JoinColumn(name = "escuela_id", nullable = false)
    @Schema(description = "La escuela (usuario) que participa")
    private Usuario escuela;

    @Column(name = "director_responsable", length = 100)
    @Schema(description = "Nombre del director o encargado para este evento", example = "Lic. Juan Pérez")
    private String directorResponsable;

    @Column(name = "maestros_acompanantes", columnDefinition = "TEXT")
    @Schema(description = "Lista de nombres de maestros que acompañan al grupo", example = "Mtra. Ana López, Profe. Carlos Ruiz")
    private String maestrosAcompanantes;

    @Column(name = "num_grupos")
    @Schema(description = "Número de contingentes o grupos participantes", example = "2")
    private Integer numGrupos;

    @Column(name = "alumnos_programados")
    @Schema(description = "Cantidad estimada de alumnos que asistirán", example = "50")
    private Integer alumnosProgramados;

    @Column(name = "alumnos_reales")
    @Schema(description = "Cantidad real de alumnos que asistieron (se llena después del evento)", example = "48")
    private Integer alumnosReales;

    @Column(name = "resena_historica")
    @Schema(description = "Ruta o nombre del archivo con la reseña de la escuela", example = "resena_benito_juarez.pdf")
    private String resenaHistorica; 

    @Column(name = "orden_asignado")
    @Schema(description = "Posición asignada para el desfile o participación", example = "5")
    private Integer ordenAsignado;

    @CreationTimestamp
    @Column(name = "fecha_registro", updatable = false)
    @Schema(description = "Fecha en que se realizó la inscripción", accessMode = Schema.AccessMode.READ_ONLY)
    private LocalDateTime fechaRegistro;
}