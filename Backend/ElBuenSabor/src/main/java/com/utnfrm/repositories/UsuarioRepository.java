package com.utnfrm.repositories;

import com.utnfrm.entities.Usuario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepository extends BaseRepository<Usuario, Long> {

    // Método JPQL: trabaja con las Entidades del código
    @Query(value = "SELECT u FROM Usuario u WHERE u.nombre=:email")
    Usuario buscarPorEmail(@Param("email") String email);

}
