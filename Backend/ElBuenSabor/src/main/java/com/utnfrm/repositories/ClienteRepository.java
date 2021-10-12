package com.utnfrm.repositories;

import com.utnfrm.entities.Cliente;
import com.utnfrm.entities.Usuario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends BaseRepository<Cliente, Long> {
    
    @Query(value = "SELECT cli FROM Cliente cli WHERE cli.nombre=:email")
    Cliente buscarPorEmail(@Param("email") String email);
}
