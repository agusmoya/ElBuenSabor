package com.utnfrm.repositories;

import com.utnfrm.entities.Domicilio;
import org.springframework.stereotype.Repository;

@Repository
public interface DomicilioRepository extends BaseRepository<Domicilio, Long> {

    //@Query(value = "SELECT d FROM Domicilio d WHERE d.calle=:calle AND d.numero=:numero AND d.localidad.denominacion=:denominacionLocalidad")
    //Domicilio buscarPorDireccion(@Param("calle") String calle, @Param("numero") String numero, @Param("denominacionLocalidad") String denominacionLocalidad);
}
