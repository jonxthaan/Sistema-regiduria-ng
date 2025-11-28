package com.regiduria.app.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "usuarios")
@Schema(description = "Usuario del sistema (representa principalmente a una Escuela o al Administrador)")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador interno del usuario", example = "10", accessMode = Schema.AccessMode.READ_ONLY)
    private Integer id;

    @Column(name = "cct_usuario", nullable = false, unique = true, length = 50)
    @Schema(description = "Clave de Centro de Trabajo (CCT) que sirve como nombre de usuario para el login", example = "20DPR0540Z")
    private String cctUsuario;

    @Column(nullable = false)
    @Schema(description = "Contraseña de acceso al sistema", example = "mi_password_seguro_123", accessMode = Schema.AccessMode.WRITE_ONLY)
    private String password;

    @Column(name = "nombre_escuela", nullable = false, length = 100)
    @Schema(description = "Nombre oficial de la institución educativa", example = "Escuela Primaria Benito Juárez")
    private String nombreEscuela;

    @Column(name = "nombre_director", length = 100)
    @Schema(description = "Nombre completo del director actual", example = "Prof. Juan Carlos Pérez")
    private String nombreDirector;

    // Relación con Niveles Educativos
    @ManyToOne
    @JoinColumn(name = "nivel_id") 
    @Schema(description = "Nivel educativo al que pertenece la escuela")
    private NivelEducativo nivelEducativo;

    @Enumerated(EnumType.STRING)
    @Schema(description = "Rol de permisos dentro del sistema", example = "escuela")
    private Rol rol;

    @CreationTimestamp
    @Column(name = "creado_en", updatable = false)
    @Schema(description = "Fecha de alta en el sistema", accessMode = Schema.AccessMode.READ_ONLY)
    private LocalDateTime creadoEn;

    // Enum para el Rol
    public enum Rol {
        admin, escuela
    }
}
