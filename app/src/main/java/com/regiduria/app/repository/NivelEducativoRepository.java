package com.regiduria.app.repository;

import com.regiduria.app.model.NivelEducativo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NivelEducativoRepository extends JpaRepository<NivelEducativo, Integer> {
    // Aquí no necesitas agregar nada más por ahora.
    // JpaRepository ya incluye findAll(), save(), delete(), etc.
}
