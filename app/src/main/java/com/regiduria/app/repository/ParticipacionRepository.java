package com.regiduria.app.repository;
import com.regiduria.app.model.Participacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipacionRepository extends JpaRepository<Participacion, Integer> {
    // Aquí seguramente necesitarás buscar: "¿Participaciones de X escuela?"
    // List<Participacion> findByEscuelaId(Long escuelaId);
}
