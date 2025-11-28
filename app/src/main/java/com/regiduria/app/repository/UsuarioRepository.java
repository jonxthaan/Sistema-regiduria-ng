package com.regiduria.app.repository;

import com.regiduria.app.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    // Aquí puedes agregar métodos personalizados si necesitas
    // Ejemplo: buscar por CCT
    // Optional<Usuario> findByCctUsuario(String cctUsuario);
}
